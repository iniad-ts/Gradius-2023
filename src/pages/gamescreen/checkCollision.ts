export function checkCollision(
  bullet: { x: number; y: number },
  enemy: { x: number; y: number; speedX: number }
) {
  const bullet_radius = 5;
  const enemy_radius = 32.5;
  const dx = bullet.x - enemy.x;
  const dy = bullet.y - enemy.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  const collisionDistance = bullet_radius + enemy_radius;
  return distance <= collisionDistance;
}
