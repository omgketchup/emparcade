#pragma strict
var owner:GameObject;
var reticuleMaxDistance:int = 10;

protected var distToOwner:float = 0;

function Start () {

}

function Update () {
	distToOwner = Vector3.Distance(transform.position, owner.transform.position);
	if(distToOwner >= reticuleMaxDistance){
		transform.position = Vector3.MoveTowards(transform.position, owner.transform.position, distToOwner - reticuleMaxDistance);
	}
}