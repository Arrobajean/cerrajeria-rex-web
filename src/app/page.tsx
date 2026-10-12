import { ContactChannels } from "@/components/contact/contact-channels";
import { Coverage } from "@/components/home/coverage";
import { Hero } from "@/components/home/hero";
import { ServicesPreview } from "@/components/home/services-preview";
import { WhyUs } from "@/components/home/why-us";
import { JsonLd } from "@/components/seo/json-ld";
import { SectionHeading } from "@/components/ui/section-heading";
import { HOME_COPY } from "@/content/home";
import { locksmithJsonLd } from "@/lib/seo";

export default function HomePage() {
  return (
    <>
      <JsonLd data={locksmithJsonLd()} />
      <Hero />
      <ServicesPreview />
      <Coverage />
      <WhyUs />
      <section aria-labelledby="titulo-contacto" className="container-page border-t border-line py-16 lg:py-24">
        <SectionHeading id="titulo-contacto" title={HOME_COPY.contact.heading} intro={HOME_COPY.contact.intro} />
        <div className="mt-10">
          <ContactChannels />
        </div>
      </section>
    </>
  );
}
