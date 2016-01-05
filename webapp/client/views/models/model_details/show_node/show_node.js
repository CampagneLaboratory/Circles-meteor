Template.ModelsModelDetailsShowNode.rendered = function() {
	
};

Template.ModelsModelDetailsShowNode.events({
	
});

Template.ModelsModelDetailsShowNode.helpers({
	
});

Template.SVGTemplate.onRendered(function() {
    console.log("Inside onRendered for SVGTemplate");
    var s = Snap("#svg_div");
    var f = Snap.parse(this.data.find_node.SVG); 
    s.append(f);                                                                 
    console.log("SVG fragment appended");
    console.log(s.innerSVG());
});


