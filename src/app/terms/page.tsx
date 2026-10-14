import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal-page";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Terms & Conditions — ${site.name}`,
  description: `The terms for using the ${site.name} website and ordering cakes, waffles, brownies and more from us.`,
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms & Conditions" updated="5 October 2026">
      <h2>1. Introduction</h2>
      <p>
        Welcome to Choco Rush. These Terms &amp; Conditions govern your use of our website and the purchase of our bakery
        products, including cakes, brownies, brownie boxes, cookies, and other food items.
      </p>
      <p>By accessing our website or placing an order, you agree to these Terms &amp; Conditions.</p>

      <h2>2. Products and Descriptions</h2>
      <p>
        Choco Rush makes reasonable efforts to ensure that product descriptions, photographs, prices, flavours, sizes, and
        other details displayed on the website are accurate.
      </p>
      <p>However:</p>
      <ul>
        <li>Actual product appearance may vary slightly from website photographs.</li>
        <li>Decorations, colours, packaging, and presentation may vary depending on availability.</li>
        <li>Product availability may change without prior notice.</li>
        <li>
          Product ingredients, size, and quantity are as described on the relevant product page or confirmed at the time
          of ordering.
        </li>
      </ul>
      <p>We reserve the right to correct listing errors and discontinue products when necessary.</p>

      <h2>3. Orders and Confirmation</h2>
      <ul>
        <li>Customers may place orders through the ordering options available on our website.</li>
        <li>An order is considered accepted once Choco Rush confirms it through the applicable confirmation process.</li>
        <li>
          We reserve the right to reject or cancel an order in circumstances such as product unavailability, incorrect
          pricing, payment issues, suspected fraud, or other reasonable operational circumstances.
        </li>
        <li>
          If payment has already been received for an order cancelled by Choco Rush, an appropriate refund will be
          arranged.
        </li>
      </ul>

      <h2>4. Pricing and Payment</h2>
      <ul>
        <li>
          Product prices and applicable charges will be displayed on the website before the order is completed.
        </li>
        <li>Additional charges for delivery, packaging, or customisation may apply where disclosed.</li>
        <li>
          Payments must be made through the payment methods available on our website. Payments processed by third-party
          providers are also subject to their applicable terms and conditions.
        </li>
        <li>We reserve the right to correct pricing errors and inform customers if an order is affected.</li>
      </ul>

      <h2>5. Delivery and Pickup</h2>
      <p>Delivery and pickup options depend on the locations and services supported by Choco Rush.</p>
      <p>Customers are responsible for providing accurate contact details and delivery addresses.</p>
      <ul>
        <li>Delivery times are estimates unless a specific time is confirmed.</li>
        <li>
          Delays may occur due to traffic, weather, operational issues, or other circumstances beyond our reasonable
          control.
        </li>
        <li>Customers should ensure that someone is available to receive the order.</li>
        <li>Special delivery instructions should be communicated before the order is confirmed.</li>
        <li>Customised cakes and made-to-order products may require advance notice.</li>
      </ul>
      <p>
        Any applicable delivery charges and estimated delivery times will be communicated during the ordering process.
      </p>

      <h2>6. Cancellation, Refunds and Replacements</h2>
      <p>
        As our products consist of freshly prepared and potentially perishable food items, cancellation and refund
        eligibility may depend on the product and preparation stage.
      </p>
      <ul>
        <li>Orders for customised cakes or made-to-order products may not be cancellable once preparation has started.</li>
        <li>
          If an order is incorrect, damaged, or defective upon delivery, please contact us promptly with your order details
          and supporting photographs, where applicable.
        </li>
        <li>
          Each complaint will be reviewed, and an appropriate resolution may include a replacement, refund, or another
          suitable remedy.
        </li>
        <li>
          Approved refunds will be processed through the applicable payment method or another agreed method, subject to
          payment provider processing times.
        </li>
        <li>Please contact us using the details below for cancellation, refund, or replacement assistance.</li>
      </ul>
      <p>Nothing in this policy excludes any consumer rights that cannot legally be excluded under applicable law.</p>

      <h2>7. Allergies and Food Information</h2>
      <ul>
        <li>
          Our bakery products may contain allergens such as wheat, gluten, milk, eggs, nuts, soy, and other ingredients.
        </li>
        <li>Products prepared in the same kitchen may come into contact with other allergens.</li>
        <li>
          Customers with food allergies or dietary restrictions should contact Choco Rush before placing an order to
          confirm ingredient information and product suitability.
        </li>
        <li>
          Customers should not assume that a product is free from a particular allergen unless this has been specifically
          confirmed.
        </li>
      </ul>

      <h2>8. Product Storage and Consumption</h2>
      <ul>
        <li>
          Customers are responsible for following the storage, refrigeration, handling, and consumption instructions
          supplied with their products.
        </li>
        <li>Different bakery products may have different storage requirements and shelf lives.</li>
        <li>
          Choco Rush cannot be held responsible for product deterioration resulting from improper storage or handling after
          delivery, subject to applicable consumer protection laws.
        </li>
      </ul>

      <h2>9. Customer Responsibilities</h2>
      <p>When using our website, customers agree to:</p>
      <ul>
        <li>Provide accurate information when placing orders.</li>
        <li>Use the website only for lawful purposes.</li>
        <li>Avoid fraudulent orders, unauthorised payments, and misuse of website functionality.</li>
        <li>Respect the intellectual property rights of Choco Rush and other parties.</li>
      </ul>
      <p>We may refuse or cancel orders where there is reasonable evidence of fraud, abuse, or unlawful activity.</p>

      <h2>10. Intellectual Property</h2>
      <p>
        All website content, including text, photographs, product images, logos, graphics, and branding, belongs to Choco
        Rush or its respective content owners, unless otherwise stated.
      </p>
      <p>
        No website content may be copied, reproduced, distributed, modified, or commercially used without permission from
        the relevant rights holder.
      </p>

      <h2>11. Limitation of Liability</h2>
      <p>Choco Rush takes reasonable care in preparing and fulfilling customer orders.</p>
      <p>
        To the extent permitted by applicable law, Choco Rush is not responsible for indirect losses arising from website
        interruptions, delays beyond our reasonable control, or improper handling of products after delivery.
      </p>
      <p>
        Nothing in these Terms &amp; Conditions excludes or limits liability where such exclusion or limitation is
        prohibited by applicable law.
      </p>

      <h2>12. Privacy</h2>
      <p>
        Customers&apos; personal information is handled in accordance with our <Link href="/privacy">Privacy Policy</Link>.
        Please review our Privacy Policy to understand how we collect, use, and protect your information.
      </p>

      <h2>13. Changes to These Terms</h2>
      <p>
        Choco Rush may update these Terms &amp; Conditions from time to time. Revised terms will be published on this page
        with an updated date.
      </p>

      <h2>14. Governing Law</h2>
      <p>
        These Terms &amp; Conditions are subject to the applicable laws of the jurisdiction in which Choco Rush operates,
        including applicable consumer protection laws.
      </p>

      <h2>15. Contact Information</h2>
      <p>For questions about these Terms &amp; Conditions, orders, or customer support, please contact us:</p>
      <ul>
        <li>
          <strong>Business Name:</strong> Choco Rush
        </li>
        <li>
          <strong>Email:</strong> <a href="mailto:pmeera2290@gmail.com">pmeera2290@gmail.com</a>
        </li>
        <li>
          <strong>Phone:</strong> <a href="tel:+918870234362">+91 8870234362</a>
        </li>
        <li>
          <strong>Address:</strong> No 26, CMR ROAD A A PRIVATE LANE, MADURAI- 625009
        </li>
      </ul>
    </LegalPage>
  );
}
