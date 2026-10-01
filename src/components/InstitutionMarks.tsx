import Image from "next/image";

export default function InstitutionMarks() {
  return (
    <div className="hidden lg:flex absolute right-6 xl:right-20 top-1/2 -translate-y-1/2 items-center gap-7" aria-label="KGEC and MAKAUT institutions">
      <Image src="/kgec.png" alt="Kalyani Government Engineering College" width={224} height={224} className="h-48 w-48 object-contain" />
      <span className="font-serif text-[5rem] font-bold leading-none text-[#deb86d]">×</span>
      <Image src="/makaut.png" alt="Maulana Abul Kalam Azad University of Technology" width={224} height={224} className="h-48 w-48 object-contain" />
    </div>
  );
}