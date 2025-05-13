import { hex16 } from "./HexUtil";

export function getUsagePageName(usagePage: number) {
    const kUsagePageNames: any = {
      // 0x0000 is Undefined
      0x0001: 'Generic Desktop',
      0x0002: 'Simulation Controls',
      0x0003: 'VR Controls',
      0x0004: 'Sport Controls',
      0x0005: 'Game Controls',
      0x0006: 'Generic Device Controls',
      0x0007: 'Keyboard/Keypad',
      0x0008: 'LED',
      0x0009: 'Button',
      0x000A: 'Ordinal',
      0x000B: 'Telephony',
      0x000C: 'Consumer',
      0x000D: 'Digitizers',
      0x000E: 'Haptics',
      0x000F: 'Physical Input',  // Device Class Definition for Physical Interface Devices, section 5
      0x0010: 'Unicode',
      0x0012: 'Eye and Head Trackers',
      0x0014: 'Auxiliary Display',
      0x0020: 'Sensors',
      0x0040: 'Medical Instrument',
      0x0041: 'Braille Display',
      0x0059: 'Lighting and Illumination',
      0x0080: 'USB Monitor',  // USB Monitor Control Class Specification, section 6
      0x0081: 'USB Enumerated Values',  // USB Monitor Control Class Specification, section 6
      0x0082: 'VESA Virtual Controls',  // USB Monitor Control Class Specification, section 6
      // 0x0083 reserved for USB Monitors
      0x0084: 'Power Device',  // USB Usage Tables for HID Power Devices, section 4.1
      0x0085: 'Battery System',  // USB Usage Tables for HID Power Devices, section 4.2
      // 0x0086 reserved for Power Devices
      // 0x0087 reserved for Power Devices
      0x008C: 'Bar Code Scanner',  // USB HID Point of Sale Usage Tables, section 3
      0x008D: 'Weighing Devices',  // USB HID Point of Sale Usage Tables, section 4
      0x008E: 'Magnetic Stripe Reader',  // USB HID Point of Sale Usage Tables, section 5
      // 0x008F reserved for Point of Sale Devices
      0x0090: 'Camera Control',
      0x0091: 'Arcade',
      0x0092: 'Gaming Device',
      0xF1D0: 'FIDO Alliance',
    };
    if (usagePage in kUsagePageNames)
      return kUsagePageNames[usagePage];
    if (usagePage >= 0xFF00)
      return `Vendor-defined page 0x${hex16(usagePage)}`;
    return `Unknown usage page 0x${hex16(usagePage)}`;
  };
  