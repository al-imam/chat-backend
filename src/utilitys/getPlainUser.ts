function plainUser(object: any) {
  return {
    email: object.email,
    profile: object.profile,
    id: object._id,
    created: object.created_at,
    updated: object.updated_at,
  };
}

export default plainUser;
