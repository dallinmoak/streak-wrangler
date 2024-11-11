export default function HomeActionItem({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-plum-600 border-plum-900 border-solid border-2 rounded-2xl px-2 py-1 min-w-[80%]">
      {children}
    </div>
  );
}