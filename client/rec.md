//this gives you all the resources liked by users
match (n: User)-[l: HAS_LIKED]->(r: Resource)<-[w: HAS_LIKED]-(e: User) return r;
match (n: User)-[l: HAS_LIKED]-(r: Resource) return n, r;

//sum of all the counts
MATCH (n:User)-[r: HAS_LIKED]->(l: Resource)
RETURN type(r), count(*)

MATCH (n: User)-[:HAS_LIKED]->(r: Resource)<-[:HAS_LIKED]-(m: User)
WHERE NOT (n)-[:HAS_LIKED]-(m)
RETURN r, count(r)
ORDER BY count(r) DESC
LIMIT 

MATCH (n: User {username: 'jo'})-[:HAS_LIKED]->(r: Resource)<-[:HAS_LIKED]-(m: User {username: 'sa'})
WHERE NOT (n)-[:HAS_LIKED]-(m)
RETURN r, count(r)
ORDER BY count(r) DESC

MATCH (a:User)-[r: HAS_LIKED]->(b: Resource)
RETURN a.username as name, count(r) as count
ORDER BY count DESC
LIMIT 5

//collab filtering
MATCH (u: User)-[:HAS_LIKED]->(r: Resource)<-[:HAS_LIKED]-(y: User)-[:HAS_LIKED]->(s: Resource)
//we filter out the results to return matches the user has not already liked
WHERE not(u = y) and not (u = s)
RETURN count(*) AS rec, s.name AS name
ORDER BY rec DESC, name DESC;

//collab based on what they both like
MATCH (u: User)-[:HAS_LIKED]->(r: Resource)<-[:HAS_LIKED]-(y: User)-[:HAS_LIKED]->(s: Resource)
WHERE not(u = y) and not (u = s)
RETURN count(*) AS rec, r.name AS name
ORDER BY rec DESC, name DESC;

//real result of collab filt
MATCH (u: User)-[:HAS_LIKED]->(r: Resource)<-[:HAS_LIKED]-(y: User)-[:HAS_LIKED]->(s: Resource)
//we filter out the results to return matches the user has not already liked
WHERE not(u = y) and not (u -- s)
RETURN count(*) AS rec, s.name AS name
ORDER BY rec DESC, name DESC;

//finding the similarities
MATCH (n: User)-[r1: HAS_LIKED]->(r: Resource)<-[r2: HAS_LIKED]-(y: User)
WITH n,count(DISTINCT r1) AS H1,count(DISTINCT r2) AS H2,y
MATCH (n)-[r1: HAS_LIKED]->(r: Resource)<-[r2:HAS_LIKED]-(y)
RETURN sum((1-ABS(r1.HAS_LIKED/H1-r2.HAS_LIKED/H2))*(r1.HAS_LIKED+r2.HAS_LIKED)/(H1+H2)) AS similarity

//finding similar favs based on the tags selected
MATCH
  (m: User)-[:HAS_LIKED]->(r: Resource)-[:TAGGED]->(TAG)<-[:TAGGED]-(s: Resource)<-[:HAS_LIKED]-(y: User)
WHERE m.username = 'jo' AND NOT m=y
RETURN y.username AS name, count(*) AS similar_favs
ORDER BY similar_favs DESC

//The intersection
MATCH (u: User)-[:HAS_LIKED]->(r: Resource)<-[:HAS_LIKED]-(y: User)-[:HAS_LIKED]->(s: Resource)
WHERE not(u = y) and not (u = s)
RETURN count(*) AS rec, r.name AS name
ORDER BY rec DESC, name DESC;

//The union
MATCH (u: User)-[:HAS_LIKED]->(r: Resource)<-[:HAS_LIKED]-(y: User)-[:HAS_LIKED]->(s: Resource)
WHERE not(u = y) and not (u = s)
RETURN count(*) AS rec, s.name AS name
ORDER BY rec DESC, name DESC;

//individual likes
MATCH (u: User)-[:HAS_LIKED]->(r: Resource)<-[:HAS_LIKED]-(y: User)-[:HAS_LIKED]->(s: Resource)
WHERE not(u = y) and not (u -- s)
RETURN count(*) AS rec, s.name AS name
ORDER BY rec DESC, name DESC;

//Cosine similarities
//the calculation is correct, but need to find the total number of likes and implement it somehow
MATCH (u1:User)-[x:HAS_LIKED]->(m:Resource)<-[y:HAS_LIKED]-(u2:User)
WITH SUM(x.HAS_LIKED * y.HAS_LIKED) AS DotProduct,
 SQRT(REDUCE(xDot = 0, i IN COLLECT(x.HAS_LIKED) | xDot + toInt(i^2))) AS xLength,
 SQRT(REDUCE(yDot = 0, j IN COLLECT(y.HAS_LIKED) | yDot + toInt(j^2))) AS yLength,
 u1, u2
CREATE UNIQUE (u1)-[s:SIMILARITY]-(u2)
SET s.value = DotProduct / (xLength * yLength)

//implementing the similarities
MATCH (u1:User {name:'sa'})-[s:SIMILARITY]-(u2:User)
WITH u2, s.value AS sim
ORDER BY sim DESC
LIMIT 3
RETURN u2.username AS Neighbor, sim AS Similarity

//this will return the resource a user has read but not others with the same similarities
MATCH (u2:User)-[r:HAS_LIKED]->(m:Resource), (u2:User)-[s:SIMILARITY]-(u1:User {name:'jo'})
WHERE NOT((u1)-[:RATED]->(m))
WITH m, u2, s.value AS similarity
ORDER BY similarity DESC
return m, u2

//Changing the collab rec to episodes
MATCH (u: User)-[:HAS_LIKED]-(e: Episode)-[:EPISODE_OF]-(r: Resource)-[:EPISODE_OF]-(e2: Episode)-[:HAS_LIKED]-(y: User)-[:HAS_LIKED]-(e: Episode)-[:EPISODE_OF]-(r: Resource)
WHERE NOT (u = y) AND NOT (u--e)
RETURN count(*) AS rec, s.name AS name
ORDER BY rec DESC, name DESC;