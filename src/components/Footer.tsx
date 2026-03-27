const Footer = () => (
  <footer className="section-invert px-6 md:px-12 lg:px-24 py-12">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-8">
      <div>
        <p className="font-display text-lg font-bold mb-2">GQuant Treasury Engine</p>
        <p className="text-sm text-text-tertiary">Quantitative capital automation.</p>
      </div>
      <div className="text-sm text-text-tertiary space-y-1">
        <p>Trading involves significant risk of loss.</p>
        <p>Past performance does not guarantee future results.</p>
        <p className="pt-2 text-xs">© {new Date().getFullYear()} G-Quant. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
