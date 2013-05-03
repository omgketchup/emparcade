#pragma strict
public class Player extends MonoBehaviour{

	function Start () {
		
	}
	
	protected var dX:float = 0;
	public var speed:float = 10;
	
	protected var rawPoint:Vector3;
	protected var touchPoint:Vector3;
	
	
	protected var alignment:String = "Fire";
	
	function Update () {
		GetInput();
		MoveToMouse();
		FireMain();
	}
	
	function GetInput(){
		if(Input.GetKeyDown(KeyCode.Space)){
			UseSpecial();
		}
		if(Input.GetMouseButtonDown(0)){  //ON MOBILE, LOOK FOR A SECOND FINGER PRESS.  ON PC, LOOK FOR MOUSE BUTTON DOWN/UP
			reticule.parent = gameObject.transform;
			reticule.GetComponent(ReticuleScript).enabled = false;
		}
		if(Input.GetMouseButtonUp(0)){
			reticule.parent = null;
			reticule.GetComponent(ReticuleScript).enabled = true;
		}
	}
	
	function UseSpecial(){
		//This should switch colors.
		SwitchAlignment();
	}
	function SwitchAlignment(){
		if(alignment == "Fire"){
			alignment = "Ice";
			gameObject.renderer.material.color = Color.blue;
		}else{
			alignment = "Fire";
			gameObject.renderer.material.color = Color.red;
		}
	}
	
	//MOVEMENT
	function MoveToMouse(){
		var p:Vector3 = CastRayToWorld();
		p.z = 100;
		transform.position = Vector3.MoveTowards(transform.position, p, speed * Time.deltaTime);
	}
	
	private var distance:float = 18.0;
	function CastRayToWorld() {
	    var ray : Ray = Camera.main.ScreenPointToRay(Input.mousePosition);    
	    var point : Vector3 = ray.origin + (ray.direction * distance);    
	    return point;
	}
	
	
	
	
	//FIRING BULLETS!
	public var bulletPrefab:GameObject;
	protected var isReloading:boolean = false;
	protected var reloadTime:float = .15;
	
	public var reticule:Transform;
	function FireMain(){
		if(!isReloading){
			var bullet:GameObject = Instantiate(bulletPrefab, transform.position, Quaternion.identity);
			var dir:Vector3 = (reticule.transform.position - transform.position).normalized;
			dir.z = 0;
			bullet.GetComponent(BulletControl).Fire(dir, alignment);
			isReloading = true;
			yield WaitForSeconds(reloadTime);
			isReloading = false;
		}
	}
	
}
