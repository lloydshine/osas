import { getAdmissionById } from "@/actions/admission.action";

export default async function AdmissionPage({ params }: { params: any }) {
  if (!params) return null;
  const admission = await getAdmissionById(params.id);
  if (!admission) return <>Admission not found</>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admission Status</h1>
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-lg font-semibold">Admission Details</h2>
        <p>
          <strong>Admission No:</strong> {admission.admissionNo}
        </p>
        <p>
          <strong>Name:</strong> {admission.firstName} {admission.middleName}{" "}
          {admission.lastName}
        </p>
        <p>
          <strong>Email:</strong> {admission.email}
        </p>
        <p>
          <strong>Phone Number:</strong> {admission.phoneNumber}
        </p>
        <p>
          <strong>Course:</strong> {admission.course}
        </p>
        <p>
          <strong>Program:</strong> {admission.program}
        </p>
        <p>
          <strong>Status:</strong> {admission.status}
        </p>
        <p>
          <strong>Created At:</strong>{" "}
          {new Date(admission.createdAt).toLocaleDateString()}
        </p>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-lg font-semibold">Requirements Status</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Requirement
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {admission.requirements.map((requirement) => (
              <tr key={requirement.id}>
                <td className="px-4 py-2">{requirement.name}</td>
                <td
                  className={`px-4 py-2 ${
                    requirement.isSubmitted ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {requirement.isSubmitted ? "Submitted" : "Not Submitted"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
