import { getOfficeUsers } from "@/actions/office.action";
import { accountColumn } from "@/lib/columns";
import { DataTable } from "@/components/admin/DataTable";
import { AccountForm } from "@/components/forms/AccountForm";
import { FormModal } from "@/components/admin/FormModal";

export default async function OsasPage() {
  const members = await getOfficeUsers("OSAS");
  return (
    <main className="space-y-10">
      <section className="text-center p-10 bg-primary rounded-md">
        <h1 className="text-3xl font-bold text-primary-foreground">
          OFFICE OF STUDENT AFFAIRS AND SERVICES
        </h1>
      </section>
      <FormModal title="Add Account">
        <AccountForm office="OSAS" />
      </FormModal>
      <DataTable columns={accountColumn} data={members} />
    </main>
  );
}
