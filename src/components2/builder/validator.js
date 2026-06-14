export const ROUNDS_MIN_ABSOLUTE = 1;
export const ROUNDS_MAX = 8;

export function maxImpostersAllowed(maxMembers) {
  return Math.floor((maxMembers - 1) / 2);
}

// One imposter can be eliminated per round at most,
// so rounds must cover all imposters
export function minRoundsRequired(impostersCount) {
  return Math.max(ROUNDS_MIN_ABSOLUTE, impostersCount);
}

export function validateGameConfig({ maxMembers, impostersCount, maxRounds }) {
  const errors = {};
  const maxImp = maxImpostersAllowed(maxMembers);
  const minRounds = minRoundsRequired(impostersCount);

  if (impostersCount > maxImp) {
    errors.impostersCount = `Max ${maxImp} imposter(s) for ${maxMembers} players`;
  }
  if (maxRounds < minRounds) {
    errors.maxRounds = `Need at least ${minRounds} round(s) for ${impostersCount} imposter(s)`;
  }
  if (maxRounds > ROUNDS_MAX) {
    errors.maxRounds = `Rounds can't exceed ${ROUNDS_MAX}`;
  }

  return { valid: Object.keys(errors).length === 0, errors };
}