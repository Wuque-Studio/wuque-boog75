import Script from 'next/script'

function FishAnima() {
    return (
        <>
            <div className="container">
                <Script src='/asset/js/jQuery.js' async></Script>
                <Script strategy="lazyOnload" src="/asset/js/Fish.js" defer></Script>
            </div>
            <div id="jsi-flying-fish-container" className="container">
                <canvas width="100%" height="155"></canvas>
            </div>
        </>
    )
}

export default FishAnima