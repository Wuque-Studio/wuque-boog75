import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import { getVendorName } from './VendorNameDict';
import { getUsageName } from './UsageNameDict';
import { hex8, hex16, parseHexArray } from './HexUtil';


const  WebHID: React.FC = () => {
  const [selectedDevice, setSelectedDevice] = useState<any>(null)
  const [deviceInfo, setDeviceInfo] = useState<string>("")
  const [outputReport, setOutputReport] = useState<string>("03 AC 00 1A BC 9C 2E CC 71 34 98 DB 9B 59 B6 34 49 5E F1 C4 0F E6 7E 22 E7 4C 3C FF 76 75 E8 43 93")


  useEffect(() => {
    handleOnLoad()
  }, [])

  const handleOnLoad = async () => {
    // Register for connection and disconnection events.
    navigator.hid.onconnect = (e: any) => { addDevice(e.device); };
    navigator.hid.ondisconnect = (e: any) => { removeDevice(e.device); };

    // Fetch the list of connected devices.
    const devices = await navigator.hid.getDevices();
    for (let device of devices)
      await addDevice(device);
  }

  const handleConnectDevice = () => {
    connectDevice()
  }

  const handleDisConnectDevice = () => {
    removeDevice(selectedDevice)
  }

  // Displays the device chooser to allow the user to connect to a new device.
  // The selection is updated to the newly connected device.
  const connectDevice = async () => {
    const deviceFilter = [
      { vendorId: 0x1001, productId: 0xf103 }, 
      { vendorId: 0x0483, productId: 0x5750 }, 
      { vendorId: 14005, productId: 12175 }
    ];
    const devices = await navigator.hid.requestDevice({filters:deviceFilter});
    // const devices = await navigator.hid.requestDevice({filters:[]});
    console.log(devices)
    if (devices.length == 0)
      return;

      console.log(devices.length)
    for (let device of devices)
      await addDevice(device);
  };

  // Adds |device| to |connectedDevices|. Selects the device if there was no prior
  // selection.
  const addDevice = async (device: any) => {
    if (selectedDevice === device) {
      console.log('device already in connectedDevices');
      return;
    }
    console.log(`device connected: ${device.productName}`);
    if (selectedDevice === null)
      await selectDevice(device);
  };

  // Removes |device| from |connectedDevices|.
  const removeDevice = (device: any) => {
    if (device === selectedDevice && device !== null) {
      console.log(`device disconnected: ${device.productName}`);
      setSelectedDevice(null)
      setDeviceInfo('');
    }   
  };

  // Selects |device| and updates the device info display.
  const selectDevice = async (device: any) => {
    if (selectedDevice)
      selectedDevice.oninputreport = null;

    if (device && device.collections[0].usagePage == 0xff01) {
      device.oninputreport = handleInputReport;
      if (!device.opened) {
        try {
          await device.open();
          console.log(`Opened ${device.productName}`);
        } catch (e) {
          if (e instanceof DOMException) {
            console.log(`Error opening ${device.productName}: ${e.message}`);
          } else {
            throw e;
          }
        }
      }

      updateDeviceInfo(device);
      setSelectedDevice(device)
    }
  };

  // Returns a string representation of all |reports| of a particular report
  // |type|.
  const formatReportListInfo = (reports: any, type: string) => {
    let reportInfo = '';
    for (const r of reports) {
      reportInfo += `${type} report 0x${hex8(r.reportId)}\n`;
      let bitOffset = 0;
      for (const item of r.items) {
        reportInfo += `  ${reportSizeAndCountAsString(item, bitOffset)}\n`;
        reportInfo += `    ${bitFieldAsString(item)}\n`;
        if (hasUsages(item))
          reportInfo += `    ${usagesAsString(item)}\n`;
        reportInfo += `    ${logicalBoundsAsString(item)}\n`;
        if (hasPhysicalBounds(item))
          reportInfo += `    ${physicalBoundsAsString(item)}\n`;
        if (hasUnitDefinition(item))
          reportInfo += `    ${unitsAsString(item)}\n`;
        bitOffset += item.reportSize * item.reportCount;
      }
    }
    return reportInfo;
  };

  const updateDeviceInfo = (device: any) => {
    if (device == null) {
      setDeviceInfo('');
      return;
    }
    
    let deviceInfo =
        `productName: ${device.productName}\n` +
        `vendorId:    0x${hex16(device.vendorId)} (${device.vendorId}) ${getVendorName(device.vendorId)}\n` +
        `productId:   0x${hex16(device.productId)} (${device.productId})\n` +
        `opened:      ${(device.opened ? 'true' : 'false')}\n`;
    
  
    if (device.collections.length == 0) {
      deviceInfo += 'collections: None';
    } else {
      for (let i = 0; i < device.collections.length; ++i) {
        const c = device.collections[i];
        let inputReports = [];
        let outputReports = [];
        let featureReports = [];
        for (const r of c.inputReports)
          inputReports.push(`0x${hex8(r.reportId)}`);
        for (const r of c.outputReports)
          outputReports.push(`0x${hex8(r.reportId)}`);
        for (const r of c.featureReports)
          featureReports.push(`0x${hex8(r.reportId)}`);
  
        deviceInfo += `collections[${i}]\n`;
        deviceInfo += `  ${collectionUsageAsString(c)}\n`;
        if (inputReports.length > 0)
          deviceInfo += `  Input reports: ${inputReports.join(', ')}\n`;
        if (outputReports.length > 0)
          deviceInfo += `  Output reports: ${outputReports.join(', ')}\n`;
        if (featureReports.length > 0)
          deviceInfo += `  Feature reports: ${featureReports.join(', ')}\n`;
      }
      
      for (let i = 0; i < device.collections.length; ++i) {
        const c = device.collections[i];
        deviceInfo += formatReportListInfo(c.inputReports, 'Input');
        deviceInfo += formatReportListInfo(c.outputReports, 'Output');
        deviceInfo += formatReportListInfo(c.featureReports, 'Feature');
      }
    }
  
    setDeviceInfo(deviceInfo);
  };

  // Returns true if |item| has at least one usage.
  const hasUsages = (item: any) => {
    return item.isRange || item.usages.length > 0
  }

  // Returns true if the physical minimum and maximum for |item| are not both
  // zero.
  const hasPhysicalBounds = (item: any) => {
    return item.physicalMinimum != 0 || item.physicalMaximum != item.physicalMinimum;
  };

  // Returns true if any unit factor exponent is non-zero, if the unit exponent is
  // not zero, or if the unit system is not 'none'.
  const hasUnitDefinition = (item: any) => {
    return item.unitFactorLengthExponent != 0 ||
            item.unitFactorMassExponent != 0 ||
            item.unitFactorTimeExponent != 0 ||
            item.unitFactorTemperatureExponent != 0 ||
            item.unitFactorCurrentExponent != 0 ||
            item.unitFactorLuminousIntensityExponent != 0 ||
            item.unitExponent != 0 ||
            item.unitSystem != 'none';
  };

  // Returns the top-level usage assigned to |collection| as a human-readable string.
  const collectionUsageAsString = (collection: any) => {
    return `Usage: ${getUsageName((collection.usagePage << 16) + collection.usage)}`;
  };

  // Returns a string describing the size of an |item| starting at bit |startBit|
  // within the containing report.
  const reportSizeAndCountAsString = (item: any, startBit: number) => {
    const bitWidth = item.reportCount * item.reportSize;
    if (bitWidth == 1)
      return `1 bit (bit ${startBit})`;
    
    const endBit = startBit + bitWidth - 1;
    if (item.reportCount == 1)
      return `${item.reportSize} bits (bits ${startBit} to ${endBit})`;

    return `${pluralize(item.reportCount, 'value')} * ${pluralize(item.reportSize, 'bit')} (bits ${startBit} to ${endBit})`;
  };

  // Returns the bitfield values for |item| using human-readable abbreviations.
  // Some values are only included if they differ from the typical defaults.
  const bitFieldAsString = (item: any) => {
    let bits = [];
    bits.push(item.isConstant ? 'Cnst' : 'Data');
    bits.push(item.isArray ? 'Ary' : 'Var');
    bits.push(item.isAbsolute ? 'Abs' : 'Rel');
    if (item.wrap) bits.push('Wrap');
    if (!item.isLinear) bits.push('NLin');
    if (!item.hasPreferredState) bits.push('NPrf');
    if (item.hasNull) bits.push('Null');
    if (item.isVolatile) bits.push('Vol');
    if (item.isBufferedBytes) bits.push('Buf');
    return bits.join(',');
  };

  // Returns the usages assigned to |item| as a human-readable string.
  const usagesAsString = (item: any) => {
    if (item.isRange) {
      if (item.usageMinimum == item.usageMaximum)
        return `Usage: ${getUsageName(item.usageMinimum)}`;
      return `Usages: ${getUsageName(item.usageMinimum)} to ${getUsageName(item.usageMaximum)}`;
    }

    let usageStrings = [];
    for (const usage of item.usages)
      usageStrings.push(getUsageName(usage));
    if (usageStrings.length == 1)
      return `Usage: ${usageStrings[0]}`;
    return `Usages:\n      ${usageStrings.join('\n      ')}`
  };

  // Returns the logical bounds of |item| as a human-readable string.
  const logicalBoundsAsString = (item: any) => {
    return `Logical bounds: ${item.logicalMinimum} to ${item.logicalMaximum}`;
  };

  // Returns the physical bounds of |item| as a human-readable string.
  const physicalBoundsAsString = (item: any) => {
    return `Physical bounds: ${item.physicalMinimum} to ${item.physicalMaximum}`;
  };

  
  // Returns a human-readable string describing the unit definition for |item|.
  const unitsAsString = (item: any) => {
    let lengthName;
    let massName;
    let timeName;
    let temperatureName;
    let currentName;
    let luminousIntensityName;
    if (item.unitSystem == 'si-linear') {
      lengthName = 'cm';  // Centimeter
      massName = 'g';  // Gram
      timeName = 's';  // Seconds
      temperatureName = 'K';  // Kelvin
      currentName = 'A';  // Ampere
      luminousIntensityName = 'cd';  // Candela
    } else if (item.unitSystem == 'si-rotation') {
      lengthName = 'rad';  // Radians
      massName = 'g';  // Gram
      timeName = 's';  // Seconds
      temperatureName = 'K';  // Kelvin
      currentName = 'A';  // Ampere
      luminousIntensityName = 'cd';  // Candela
    } else if (item.unitSystem == 'english-linear') {
      lengthName = 'in';  // Inch
      massName = 'slug';  // Slug
      timeName = 's';  // Seconds
      temperatureName = '°F';  // Fahrenheit
      currentName = 'A';  // Ampere
      luminousIntensityName = 'cd';  // Candela
    } else if (item.unitSystem == 'english-rotation') {
      lengthName = 'deg';  // Degrees
      massName = 'slug';  // Slug
      timeName = 's';  // Seconds
      temperatureName = '°F';  // Fahrenheit
      currentName = 'A';  // Ampere
      luminousIntensityName = 'cd';  // Candela
    } else {
      lengthName = 'length';
      massName = 'mass';
      timeName = 'time';
      temperatureName = 'temperature';
      currentName = 'current';
      luminousIntensityName = 'luminous-intensity';
    }

    let numeratorFactors:any = [];
    let denominatorFactors: any[] = [];
    addUnitFactor(numeratorFactors, denominatorFactors, lengthName, item.unitFactorLengthExponent);
    addUnitFactor(numeratorFactors, denominatorFactors, massName, item.unitFactorMassExponent);
    addUnitFactor(numeratorFactors, denominatorFactors, timeName, item.unitFactorTimeExponent);
    addUnitFactor(numeratorFactors, denominatorFactors, temperatureName, item.unitFactorTemperatureExponent);
    addUnitFactor(numeratorFactors, denominatorFactors, currentName, item.unitFactorCurrentExponent);
    addUnitFactor(numeratorFactors, denominatorFactors, luminousIntensityName, item.unitFactorLuminousIntensityExponent);

    const exponent = (item.unitExponent == 0) ? '' : `10^${item.unitExponent}*`;
    const numerator = (numeratorFactors.length > 0) ? numeratorFactors.join('*') : '1';
    if (denominatorFactors.length == 0)
      return `Units: ${exponent}${numerator}`;

    const denominator = denominatorFactors.join('*')
    return `Units: ${exponent}${numerator}/${denominator}`;
  };

  // Appends a string representation of a unit factor with name |unitFactorName|
  // and exponent |unitFactorExponent| to an array representing unit factors in
  // the |numerator| or |denominator|. Unit factors with positive exponents are
  // appended to the numerator, unit factors with negative exponents are appended
  // to the denominator. Unit factors with exponent zero are not appended.
  const addUnitFactor = (numerator: any[], denominator : any[], unitFactorName: string, unitFactorExponent: number) => {
    if (unitFactorExponent == 0)
      return;

    const absoluteExponent = Math.abs(unitFactorExponent);
    const exponent = (absoluteExponent == 1) ? '' : `^${absoluteExponent}`;
    if (unitFactorExponent > 0)
      numerator.push(unitFactorName + exponent);
    else
      denominator.push(unitFactorName + exponent);
  };


  const pluralize = (count: number, unit: string) => {
    if (count === 1) {
      return `${count} ${unit}`;
    }
    return `${count} ${unit}s`;
  };

  const handleInputReport = (event: any) => {
    let buffer = hex8(event.reportId);  
        const reportData: any = new Uint8Array(event.data.buffer);
        for (let byte of reportData)
            buffer += ' ' + hex8(byte);
    
        console.log('InputReportData:', buffer)
  }

  const sendOutputReport = (outputReport: string) => {
    if (!selectedDevice)
      return;

    if (!outputReport)
      return;

    let data: any = parseHexArray(outputReport);

    let reportId = data.getUint8(0);
    let reportData = new Uint8Array(data.buffer).slice(1);
    console.log("reportId:",reportId);
    console.log("outPutReportData:", reportData);

    selectedDevice.sendReport(reportId, reportData);
  };
 
  
  return (
    <Grid container spacing={2}>
      <Grid item xs={2}>
        <Button variant="contained" startIcon={<KeyboardIcon />} onClick={handleConnectDevice}>
          Connect
        </Button>
      </Grid>
      <Grid item xs={2}>
        <Button variant="outlined" startIcon={<KeyboardIcon />} onClick={handleDisConnectDevice}>
          DisConnect
        </Button>
      </Grid>
      <Grid item xs={10}>
        {/* Display the device information */}
        {selectedDevice && (
            <p>
              Vendor ID: {selectedDevice.vendorId}, Product ID: {selectedDevice.productId},
              productName: {selectedDevice.productName}
            </p>
          )}
        <Typography style={{whiteSpace: 'pre-wrap'}}>
          {deviceInfo}
        </Typography>
      </Grid>
      <Grid item xs={9}>
          <TextField
          id="outlined-multiline-static"
          label="Innput Report"
          fullWidth
          multiline
          rows={4}
          defaultValue='03 AC 00 1A BC 9C 2E CC 71 34 98 DB 9B 59 B6 34 49 5E F1 C4 0F E6 7E 22 E7 4C 3C FF 76 75 E8 43 93'
          onChange={(e) => setOutputReport(e.target.value)}
          />
      </Grid>
      <Grid item xs={4}>
          <Button variant="contained" endIcon={<SendIcon />}  onClick={() => sendOutputReport(outputReport)}>
          Send
          </Button>
      </Grid>
    </Grid>
  );
}

export default WebHID;
