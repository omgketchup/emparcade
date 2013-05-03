#pragma strict
var speed:float = 5;
protected var moveDir:Vector3;
protected var alignment:String;

var baseDamage:float = 1;
function Start () {
	yield WaitForSeconds(5);
	GameObject.Destroy(gameObject);
}

function Update () {
	transform.position = Vector3.MoveTowards(transform.position, transform.position + (moveDir * speed * Time.deltaTime), speed);
}

function Fire(dir:Vector3, align:String){
	moveDir = dir;
	alignment = align;
	if(alignment == "Fire"){
		renderer.material.color = Color.red;
	}else{
		renderer.material.color = Color.blue;
	}
}

function OnTriggerEnter(c:Collider){
	if(c.collider.gameObject.tag != "Player"){
		var hp:Health = c.collider.transform.root.gameObject.GetComponent(Health);
		if(hp && c.collider.gameObject.transform.root.gameObject.renderer){
			if(c.collider.gameObject.renderer.material.color == renderer.material.color){
				c.collider.gameObject.GetComponent(Health).Damage(baseDamage, gameObject);
			}else{
				c.collider.gameObject.GetComponent(Health).Damage(baseDamage * 2, gameObject);
			}
		}
		GameObject.Destroy(gameObject);
	}
}
function OnCollisionEnter(c:Collision){
	if(c.collider.gameObject.tag != "Player"){
		GameObject.Destroy(gameObject);
	}
}