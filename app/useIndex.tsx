import { IEmployee } from "@/types/IEmployee";
import { useState } from "react";

export default function useIndex() {
  const [employees, setEmployees] = useState<IEmployee[]>([]);
  return {
    actions: {},
    states: {},
  };
}
