import { getAdmissionById } from "@/actions/admission.action";
import OsasAdmission from "./OsasAdmission";

export default async function OsasAdmissionPage({ params }: { params: any }) {
  if (!params) return null;

  const admission = await getAdmissionById(params.id);
  if (!admission) return <>Admission not found</>;

  return <OsasAdmission admission={admission} />;
}
