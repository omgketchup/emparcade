#pragma strict

public var maxHealth:int = 10;
public var health:int = 10;

public var alignment:String = "Fire";

function Start () {
	
}

function Update () {
	
}

function Damage(amount:float, collision){
	Debug.Log("DOING DAMAGE TO " + gameObject.name);
	AdjustHealth(-amount);
}

function AdjustHealth(amt:float){
	health += amt;
	if(health <= 0){
		Debug.Log("DIED!");
		GameObject.Destroy(gameObject);
	}
}