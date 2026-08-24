import { jsx, jsxs } from "react/jsx-runtime";
const SplitErrorComponent = ({
  error
}) => /* @__PURE__ */ jsx("div", { className: "bg-background min-h-screen flex items-center justify-center p-6", children: /* @__PURE__ */ jsxs("p", { className: "text-cream", children: [
  "Something went wrong: ",
  error.message
] }) });
export {
  SplitErrorComponent as errorComponent
};
