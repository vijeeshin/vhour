import { useSelector } from "react-redux";

/**
 * Check whether a permissions map grants access for a given collection + action.
 *
 * @param {object|null} permissions - The value stored in state.permissions.data
 *   Shape: { [collection]: { [action]: { access: "full"|"partial"|"none", fields?: string[] } } }
 * @param {string} collection - e.g. "PROJECT", "CUSTOMER", "directus_users"
 * @param {"read"|"create"|"update"|"delete"|"share"} action
 * @returns {boolean}
 */
const hasPermission = (permissions, collection, action) => {
  if (!permissions || !collection || !action) return false;
  const access = permissions?.[collection]?.[action]?.access;
  return access === "full" || access === "partial";
};

/**
 * React hook — reads permissions from Redux and returns a bound checker.
 *
 * @returns {(collection: string, action: string) => boolean} can
 *
 * @example
 * const can = usePermission();
 * can("PROJECT", "read")   // true
 * can("PROJECT", "create") // false
 */
const usePermission = () => {
  const permissions = useSelector((state) => state.permissions.data);
  return (collection, action) => hasPermission(permissions, collection, action);
};

export { hasPermission, usePermission };
