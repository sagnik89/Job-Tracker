export default function NotesPanel() {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 lg:sticky top-6">
      {/* Header with title and plus icon */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">Notes / To Do</h3>
        <button title="Add Note">
          <img src="/images/add-note.svg" alt="Add Note" className="w-5 h-5" />
        </button>
      </div>

      {/* Notes list */}
      <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
        <li className="opacity-60">Schedule LinkedIn follow-up</li>
        <li className="opacity-60">Prepare for Amazon OA</li>
        <li className="opacity-60">Update resume keywords</li>
      </ul>
    </div>
  );
}
