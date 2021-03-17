function isTouching(object1,object2)
{
  if(object1.x-object2.x<object2.width/2+object1.width/2 
    && object1.y-object2.y<object2.height/2+object1.height/2
    && object2.x-object1.x<object2.width/2+object1.width/2
    && object2.y-object1.y<object2.height/2+object1.height/2 )
  {
    /*movingrect.shapeColor="green";
    fixedrect.shapeColor="green";*/

    return true;
  }
  else 
  {
    //movingrect.shapeColor="yellow";
    //fixedrect.shapeColor="yellow";

    return false;
  }



}

function bounce(object1,object2)
{
   if(object1.x-object2.x<object2.width/2+object1.width/2 
    && object2.x-object1.x<object2.width/2+object1.width/2)
    {
      object1.velocityX=object1.velocityX*-1;
      object2.velocityX=object2.velocityX*-1;
    }
   else if(object1.y-object2.y<object2.height/2+object1.height/2
    &&object2.y-object1.y<object2.height/2+object1.height/2 )
    {
      object1.velocityY=object1.velocityY*-1;
      object2.velocityY=object2.velocityY*-1;
    
    }

}

function hasCollided(object1,object2)
{
    rightedge=object1.x+object1.width;
    leftedge=object2.x;
    if(rightedge>=leftedge)
    {
        return true;
    }
    else
    {
        return false;
    }

}