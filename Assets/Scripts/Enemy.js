#pragma strict
public class Enemy extends MonoBehaviour{

	protected var health:Health;
	protected var player:GameObject;
	
	protected var moveDirection:Vector3 = Vector3.zero;
	protected var randomDirection:Vector3 = Vector3.zero;
	
	public var speed:float = 5;
	
	var alignment:String = "Fire";
	
	function Start () {
		health = GetComponent(Health);
		FindPlayer();
		InvokeRepeating("ChangeRandomDirection", 0, 5);
		if(alignment == "Fire"){
			renderer.material.color = Color.red;
		}else{
			renderer.material.color = Color.blue;
		}
	}
	
	protected function FindPlayer(){
		player = GameObject.FindGameObjectWithTag("Player");
	}
	protected function ChangeRandomDirection(){
		//Debug.Log((Random.value * 100) + "Changing enemy's direction in case he's away from player");
		randomDirection = Vector3((Random.value * 2 - 1), (Random.value * 2 - 1), 0).normalized;
		
	}
	
	function Update () {
		HandleMovement();
	}
	
	function HandleMovement(){
		//face the player
		//move towards the player
		if(Vector3.Distance(transform.position, player.transform.position) <= 170 && !justBounced){
			moveDirection = (player.transform.position - transform.position).normalized;
			moveDirection.z = 0;
			randomDirection = moveDirection;
			transform.Translate(moveDirection);
		}else{
			moveDirection = randomDirection;
			transform.Translate(randomDirection);
		}
	}
	
	protected var justBounced:boolean = false;
	
	function OnCollisionEnter(c:Collision){
		moveDirection *= -1;
		randomDirection = moveDirection;
		CancelInvoke();
		justBounced = true;
		yield WaitForSeconds(5);
		ChangeRandomDirection();
		justBounced = false;
	}
}