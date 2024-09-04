/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { cn } from "../../lib/utils";

function Skeleton({ className, ...props }) {
  return <div className={cn("animate-pulse rounded-md bg-muted", className)} {...props} />;
}

export { Skeleton };