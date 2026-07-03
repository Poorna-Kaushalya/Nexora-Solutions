import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const SortableCard = ({ id, project, onEdit, onDelete }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-gray-900 rounded-xl overflow-hidden shadow-lg"
    >
      {/* IMAGE */}
      <img
        src={project.image}
        className="h-32 w-full object-cover"
        alt={project.title}
      />

      <div className="p-3">

        {/* TITLE */}
        <h3 className="font-bold">{project.title}</h3>
        <p className="text-xs text-gray-400">{project.category}</p>

        {/* GITHUB */}
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-2 text-xs bg-gray-800 px-3 py-1 rounded hover:bg-gray-700"
          >
            View GitHub
          </a>
        )}

        {/* BUTTONS */}
        <div className="flex justify-between mt-3">

          {/* EDIT BUTTON */}
          <button
            onClick={onEdit}
            className="text-blue-400 text-xs hover:text-blue-300"
          >
            Edit
          </button>

          {/* DELETE BUTTON */}
          <button
            onClick={onDelete}
            className="text-red-400 text-xs hover:text-red-300"
          >
            Delete
          </button>

        </div>

        {/* DRAG HANDLE (IMPORTANT) */}
        <div
          {...attributes}
          {...listeners}
          className="mt-2 text-xs text-gray-500 cursor-move"
        >
          ↕ Drag
        </div>

      </div>
    </div>
  );
};

export default SortableCard;