import { getOfficeUsers } from "@/actions/office.action";
import { DataTable } from "@/components/admin/DataTable";
import { FormModal } from "@/components/admin/FormModal";
import { AccountForm } from "@/components/forms/AccountForm";
import { accountColumn } from "@/lib/columns";

export default async function GuidancePage() {
  const members = await getOfficeUsers("GUIDANCE");
  return (
    <main className="space-y-10">
      <section className="text-center p-10 bg-primary rounded-md">
        <h1 className="text-3xl font-bold text-primary-foreground">GUIDANCE</h1>
      </section>
      <FormModal title="Add Account">
        <AccountForm office="GUIDANCE" />
      </FormModal>
      <DataTable columns={accountColumn} data={members} />
    </main>
  );
}
