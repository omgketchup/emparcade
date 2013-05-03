#pragma strict
public class Spawner extends MonoBehaviour{
	
	var enemyTypes:GameObject[];
	
	function Start () {
		BeginTimer();
	}
	
	function Update () {
		
	}
	
	function BeginTimer(){
		InvokeRepeating("SpawnEnemy", 2, 1);
	}
	function StopTimer(){
		this.CancelInvoke();
	}
	
	function SpawnEnemy(){
		Debug.Log("Spawning enemy");
		var prefab:GameObject = GetRandomEnemy();
		var pos:Vector3 = Vector3.zero;
		pos = Vector3
		(
			(Random.value * collider.bounds.extents.x) - (collider.bounds.extents.x/2), 
			(Random.value * collider.bounds.extents.y) - (collider.bounds.extents.y/2), 
			100
		);
		Debug.Log("RANDLOC: " + pos);
		var obj:GameObject = Instantiate(prefab, pos, Quaternion.identity);
	}
	function GetRandomEnemy(){
		Debug.Log("Got random enemy, returning.");
		return enemyTypes[Mathf.Floor(Random.value * enemyTypes.length)];
	}
}
