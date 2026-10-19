import { siteConfig } from "@/data/site";

export default function AnnouncementBar() {
  return (
    <div className="bg-zinc-900 px-4 py-2.5 text-center text-sm text-zinc-100">
      {siteConfig.announcement}
    </div>
  );
}
