import { deleteAsync } from "del";

const ignore = ["node_modules"],
	patterns = ["**/.turbo", "**/.next", "**/esm", "**/cjs", "**/dist", "**.tsbuildinfo"];

const deletedItems = await deleteAsync(patterns, { ignore });

console.info("Deleted Temp files:\n" + deletedItems.join("\n"));
