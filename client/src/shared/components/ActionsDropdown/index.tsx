import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  DotsHorizontalIcon,
  EyeOpenIcon,
  Pencil2Icon,
  TrashIcon,
} from "@radix-ui/react-icons";
import React from "react";

interface Props {
  onEdit?: () => void;
  onDelete?: () => void;
  onView?: () => void;
  showEdit?: boolean;
  showDelete?: boolean;
}

export default function ActionsDropdown({
  onDelete,
  onEdit,
  onView,
  showEdit,
  showDelete,
}: Props) {
  return (
    <div className="flex items-center justify-center w-full">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <DotsHorizontalIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={onView}
            className="flex gap-2 hover:cursor-pointer"
          >
            <EyeOpenIcon /> View
          </DropdownMenuItem>
          {showEdit && (
            <DropdownMenuItem
              onClick={onEdit}
              className="flex gap-2 hover:cursor-pointer"
            >
              <Pencil2Icon /> Edit
            </DropdownMenuItem>
          )}
          {showDelete && (
            <DropdownMenuItem
              onClick={onDelete}
              className="flex gap-2 hover:cursor-pointer"
            >
              <TrashIcon /> Delete
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
