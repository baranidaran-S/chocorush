import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Privacy Policy — ${site.name}`,
  description: `How ${site.name} handles the information you share when you visit our website or order from us.`,
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="5 October 2026">
      <h2>1. Introduction</h2>
      <p>
        Welcome to Choco Rush. We respect your privacy and are committed to protecting your personal information. This
        Privacy Policy explains how we collect, use, store, and protect your information when you visit our website, place
        an order, or use our services.
      </p>
      <p>By accessing or using our website, you agree to the practices described in this Privacy Policy.</p>

      <h2>2. Information We Collect</h2>
      <p>We may collect the following information when you interact with our website.</p>
      <h3>Personal Information</h3>
      <ul>
        <li>Full name</li>
        <li>Phone number</li>
        <li>Email address</li>
        <li>Billing and delivery address</li>
      </ul>
      <h3>Order Information</h3>
      <ul>
        <li>Products purchased, including cakes, brownies, cookies, and other bakery items</li>
        <li>Order quantity, preferences, and customisation requests</li>
        <li>Order history and delivery details</li>
      </ul>
      <h3>Payment Information</h3>
      <p>
        Payments may be processed through third-party payment service providers. Choco Rush does not intend to store
        complete debit card or credit card details on its servers.
      </p>

      <h2>3. How We Use Your Information</h2>
      <p>We may use your information to:</p>
      <ul>
        <li>Process and confirm orders.</li>
        <li>Arrange product delivery or pickup.</li>
        <li>Send order confirmations and delivery updates.</li>
        <li>Respond to questions, feedback, and complaints.</li>
        <li>Process eligible cancellations and refunds.</li>
        <li>Improve our website, products, and customer experience.</li>
        <li>Detect and prevent fraudulent transactions.</li>
        <li>Comply with applicable legal requirements.</li>
      </ul>

      <h2>4. Cookies</h2>
      <p>
        Our website may use cookies and similar technologies to maintain shopping cart information, improve website
        functionality, understand website traffic, and enhance your browsing experience.
      </p>
      <p>
        You can manage cookies through your browser settings. Disabling certain cookies may affect some website features.
      </p>

      <h2>5. Sharing of Information</h2>
      <p>Choco Rush does not sell your personal information to third parties.</p>
      <p>We may share relevant information with trusted service providers when necessary, including:</p>
      <ul>
        <li>Payment gateway providers.</li>
        <li>Delivery and logistics partners.</li>
        <li>Website hosting and technical service providers.</li>
        <li>Analytics and security service providers, where applicable.</li>
        <li>Government authorities when required by law.</li>
      </ul>
      <p>We aim to limit such sharing to what is reasonably necessary for the relevant purpose.</p>

      <h2>6. Data Security</h2>
      <p>
        We take reasonable measures to protect your personal information against unauthorised access, misuse, loss,
        alteration, or disclosure.
      </p>
      <p>However, no electronic transmission or storage system can be guaranteed to be completely secure.</p>

      <h2>7. Data Retention</h2>
      <p>
        We retain personal information only for as long as reasonably necessary to fulfil orders, provide customer
        support, maintain business records, resolve disputes, and comply with applicable legal requirements.
      </p>

      <h2>8. Your Privacy Rights</h2>
      <p>Subject to applicable law, you may request access to, correction of, or deletion of your personal information.</p>
      <p>Certain information may need to be retained to meet legal, accounting, or legitimate business requirements.</p>
      <p>For privacy-related requests, please contact us using the details provided below.</p>

      <h2>9. Third-Party Services</h2>
      <p>
        Our website may use third-party services or contain links to external websites. These services may have their own
        privacy policies. Choco Rush is not responsible for the independent privacy practices of third-party websites.
      </p>

      <h2>10. Children&apos;s Privacy</h2>
      <p>
        Our website is intended for general customers and is not specifically directed at children. We do not knowingly
        collect children&apos;s personal information in violation of applicable law.
      </p>

      <h2>11. Changes to This Privacy Policy</h2>
      <p>
        We may update this Privacy Policy from time to time to reflect changes in our business, website, or applicable
        legal requirements. Any updated version will be published on this page with a revised date.
      </p>

      <h2>12. Contact Us</h2>
      <p>If you have any questions or concerns about this Privacy Policy, please contact us:</p>
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
