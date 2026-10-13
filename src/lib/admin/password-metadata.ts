export const MUST_CHANGE_PASSWORD_META = "must_change_password";

export function mustChangePasswordFromMetadata(
  metadata: Record<string, unknown> | null | undefined,
): boolean {
  return metadata?.[MUST_CHANGE_PASSWORD_META] === true;
}

export function mustChangePasswordUserMetadata(
  value: boolean,
): Record<string, boolean> {
  return { [MUST_CHANGE_PASSWORD_META]: value };
}
