function Footer(props) {
    return (
        <section className="workspace-bot">
            <div className="container footer-align">
                <div className="col-xs-12 col-sm-6">
                    &copy; {new Date().getFullYear()} Langscape Language Solutions Pvt Ltd.
                </div>
                <div className="col-xs-12 col-sm-6">
                    <span className="footer-text-link"><a target="_blank" href="https://ailaysa.com/terms-of-service" rel="noreferrer">Terms of Service</a></span>&nbsp;and&nbsp;<span className="footer-text-link"><a target="_blank" href="https://ailaysa.com/privacy-policy" rel="noreferrer">Privacy Policies</a></span>
                </div>
            </div>
        </section>
    )
}
export default Footer