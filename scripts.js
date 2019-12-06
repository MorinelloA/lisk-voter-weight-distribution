var timestamp;
var delegatename;
var toggle;
var offset = 0;
var data = {};

window.onload = function(){
  $("#datetime").val(new Date().toJSON().slice(0,16));
};

function submit(){
  delegatename = document.getElementById("delegatename").value.trim();
  
  document.getElementById("loading").style.display = 'block';
  document.getElementById("error").style.display = 'none';

  document.getElementById("data").innerHTML = "<label class='col-1 col-form-label'><b>#</b></label><label class='col-5 col-form-label'><b>Address</b></label><label class='col-3 col-form-label'><b>Balance</b></label><br />"

  getDistribution();
}

function getDistribution()
{
  fetch("https://main-02.liskapi.io/api/voters?username=" + delegatename + "&limit=100&sort=balance:desc&offset=" + offset)
  .then(res => res.json())
  .then((out) => {
    for(let i = 0; i < out.data.voters.length; i++)
    {
      document.getElementById("data").innerHTML += "<label class='col-1 col-form-label'>" + (i + 1 + offset) + "</label><label class='col-5 col-form-label'>" + out.data.voters[i].address  + "</label><label class='col-3 col-form-label'>" + Number(out.data.voters[i].balance / 100000000).toLocaleString() + "</label><br />"
    }
    if(offset + 100 < out.data.votes)
    {
      offset+=100;
      getDistribution();
    }
    else
    {
      document.getElementById("loading").style.display = 'none';
    }
  }).catch(function(){
    document.getElementById("loading").style.display = 'none';
    document.getElementById("error").style.display = 'block';
  });
}
