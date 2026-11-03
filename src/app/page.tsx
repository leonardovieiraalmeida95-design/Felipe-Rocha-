import { siteMarkup } from "@/content";
import SiteInteractions from "@/components/site-interactions";
export default function HomePage() { return <><div className="min-h-screen" dangerouslySetInnerHTML={{ __html: siteMarkup }} /><SiteInteractions /></>; }
