const queryUserCollection = `
  select 
    b.*,
    a.favorite  
  from collections a 
  join characters b on a.idCharacter = b.id  
  where idUser = :idUser
`

module.exports = { queryUserCollection }
