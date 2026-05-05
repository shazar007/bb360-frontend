import { Icon } from "@iconify/react";

interface Props {
  onAdd?: () => void;
  onUpdate?: () => void;
  onDelete?: () => void;
}

export default function SalesInvoiceModel({
  onAdd,
  onUpdate,
  onDelete,
}: Props) {
  return (
    <div className="w-56 overflow-hidden bg-white shadow-md  rounded-2xl">
      <button
        onClick={onAdd}
        className="flex items-center justify-between w-full px-4 py-3 text-sm text-heading1 hover:bg-gray-200"
      >
        Add Row
        <Icon icon="material-symbols:add-rounded" className="text-lg" />
      </button>

      <button
        onClick={onUpdate}
        className="flex items-center justify-between w-full px-4 py-3 text-sm text-heading1 hover:bg-gray-200"
      >
        Update Row
        <Icon icon="octicon:duplicate-16" className="text-lg" />
      </button>

      <div className="border-t border-gray-300" />

      <button
        onClick={onDelete}
        className="flex items-center justify-between w-full px-4 py-3 text-sm text-heading1 hover:bg-gray-200"
      >
        Delete Row
        <Icon icon="material-symbols:delete-outline" className="text-lg" />
      </button>
    </div>
  );
}
