export default function NotesPanel() {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 lg:sticky top-6">
      <h3 className="text-xl font-bold mb-4">Notes / To Do</h3>
      <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
        <li className="opacity-60">Schedule LinkedIn follow-up</li>
        <li className="opacity-60">Prepare for Amazon OA</li>
        <li className="opacity-60">Update résumé keywords</li>
      </ul>
    </div>
  );
}
