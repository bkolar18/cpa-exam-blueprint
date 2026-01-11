import { redirect } from "next/navigation";

export default function PricingPage() {
  // Redirecting to about page during beta testing period
  redirect("/about");
}
