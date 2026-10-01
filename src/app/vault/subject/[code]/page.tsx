import SubjectVaultPage from "@/components/SubjectVaultPage";

export default function SubjectPage({ params }: { params: { code: string } }) {
  return <SubjectVaultPage code={params.code} />;
}