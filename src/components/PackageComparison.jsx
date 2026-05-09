import { motion } from "framer-motion";
import { Check, Minus } from "lucide-react";
import { comparisonFeatures } from "../data/comparisonData";

function renderValue(value) {
  if (value === "Included") {
    return (
      <span className="comparison-included">
        <Check size={16} />
        Included
      </span>
    );
  }

  if (value === "No") {
    return (
      <span className="comparison-no">
        <Minus size={16} />
        No
      </span>
    );
  }

  return value;
}

function PackageComparison() {
  return (
    <section className="comparison-section">
      <div className="section-inner">
        <motion.div
          className="services-header"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="section-label">Compare Packages</p>
          <h2>Choose The Right Photography Package</h2>
        </motion.div>

        <motion.div
          className="comparison-table-wrap"
          initial={{ y: 55, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Feature</th>
                <th>Portrait</th>
                <th>Wedding</th>
                <th>Brand</th>
              </tr>
            </thead>

            <tbody>
              {comparisonFeatures.map((item, index) => (
                <tr key={index}>
                  <td>{item.feature}</td>
                  <td>{renderValue(item.portrait)}</td>
                  <td>{renderValue(item.wedding)}</td>
                  <td>{renderValue(item.brand)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
}

export default PackageComparison;