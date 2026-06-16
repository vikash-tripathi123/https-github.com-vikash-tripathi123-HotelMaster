/******************************************
 *
 *   myOwnUI v1.0 - jQuery Plugins
 *
 *   Toaster v1.0
 *
 ******************************************/

if ( typeof Object.initObj !== 'function' ) {
    Object.initObj = function( obj ) {
        function Custom_func() {}
        Custom_func.prototype = obj;
        return new Custom_func();
    };
}

(function( $, window, document, undefined ) {
    "use strict";

    let toasterIdAvail=0;

    let initNeccessaryThings=function (){
        $(document).ready(function(){
            let $body=$('body');
            console.log($body);
            let portion_TopRight=$('<div>');
            portion_TopRight.attr({
                'class':'myOwnUI_Toaster_Panel mOUITP_top_right'
            });
            let portion_Right=$('<div>');
            portion_Right.attr({
                'class':'myOwnUI_Toaster_Panel mOUITP_right'
            });
            let portion_BottomRight=$('<div>');
            portion_BottomRight.attr({
                'class':'myOwnUI_Toaster_Panel mOUITP_bottom_right'
            });
            let portion_Bottom=$('<div>');
            portion_Bottom.attr({
                'class':'myOwnUI_Toaster_Panel mOUITP_bottom'
            });
            let portion_BottomLeft=$('<div>');
            portion_BottomLeft.attr({
                'class':'myOwnUI_Toaster_Panel mOUITP_bottom_left'
            });
            let portion_Left=$('<div>');
            portion_Left.attr({
                'class':'myOwnUI_Toaster_Panel mOUITP_left'
            });
            let portion_TopLeft=$('<div>');
            portion_TopLeft.attr({
                'class':'myOwnUI_Toaster_Panel mOUITP_top_left'
            });
            let portion_Top=$('<div>');
            portion_Top.attr({
                'class':'myOwnUI_Toaster_Panel mOUITP_top'
            });
            let portion_Center=$('<div>');
            portion_Center.attr({
                'class':'myOwnUI_Toaster_Panel mOUITP_center'
            });
            portion_TopRight.appendTo($body);
            portion_Right.appendTo($body);
            portion_BottomRight.appendTo($body);
            portion_Bottom.appendTo($body);
            portion_BottomLeft.appendTo($body);
            portion_Left.appendTo($body);
            portion_TopLeft.appendTo($body);
            portion_Top.appendTo($body);
            portion_Center.appendTo($body);
        })

    };

    initNeccessaryThings();

    let myOwnUIToasterObj={
        init: function (options, elem) {
            let _options = {};
            if ( ( typeof options === 'string' ) || ( options instanceof Array ) ) {
                _options.text = options;
            } else {
                _options = options;
            }
            this.options = $.extend( {}, $.myOwnUIToaster.options, _options );

            this.animRun=false;
            this.freezeTimer=false;

            let type=this.options.type;
            let tId=this.options.toasterId;
            if(tId==null || tId===''){
                toasterIdAvail+=1;
                tId="mOUIT_"+toasterIdAvail;
            }
            let header=this.options.header;
            let body=this.options.body;
            let trigger=this.options.trigger;
            let hoverOnTimeFreeze=this.options.hoverOnTimeFreeze;
            let presenceTimer=this.options.presenceTimer;
            let position=this.options.position;

            this._ToasterEl=$('<div>');
            if(type==='warning'){
                this._ToasterEl.attr({
                    'class':'myOwnUI_Toaster mOUIT_icon_warning'
                });
            }
            if(type==='info'){
                this._ToasterEl.attr({
                    'class':'myOwnUI_Toaster mOUIT_icon_info'
                });
            }
            if(type==='success'){
                this._ToasterEl.attr({
                    'class':'myOwnUI_Toaster mOUIT_icon_success'
                });
            }
            if(type==='failure'){
                this._ToasterEl.attr({
                    'class':'myOwnUI_Toaster mOUIT_icon_failure'
                });
            }
            if(type==='unknown'){
                this._ToasterEl.attr({
                    'class':'myOwnUI_Toaster mOUIT_icon_unknown'
                });
            }


            let header_newToaster=$('<div>');
            header_newToaster.attr({
                'class':'myOwnUI_Toaster_hdr'
            });
            let header_newToaster_icon=$('<span>');

            if(type==='warning'){
                header_newToaster_icon.attr({
                    'class':'myOwnUI_ToasterIcon warning_icon'
                });
            }
            if(type==='info'){
                header_newToaster_icon.attr({
                    'class':'myOwnUI_ToasterIcon info_icon'
                });
            }
            if(type==='success'){
                header_newToaster_icon.attr({
                    'class':'myOwnUI_ToasterIcon success_icon'
                });
            }
            if(type==='failure'){
                header_newToaster_icon.attr({
                    'class':'myOwnUI_ToasterIcon failure_icon'
                });
            }
            if(type==='unknown'){
                header_newToaster_icon.attr({
                    'class':'myOwnUI_ToasterIcon unknown_icon'
                });
            }
            header_newToaster.text(" "+header);
            header_newToaster_icon.prependTo(header_newToaster);
            header_newToaster.appendTo(this._ToasterEl);

            let body_newToaster=$('<div>');
            body_newToaster.attr({
                'class':'myOwnUI_Toaster_by'
            });
            body_newToaster.text(body);
            body_newToaster.appendTo(this._ToasterEl);

            let timerSec=$('<span>');
            timerSec.attr({
                'class':'myOUIT_timerSec'
            });
            timerSec.appendTo(this._ToasterEl);

            this._ToasterEl.css({
                'display':'none'
            });

            if(position==="top-right"){
                this._ToasterEl.appendTo('.myOwnUI_Toaster_Panel.mOUITP_top_right');
            }
            else if(position==="right"){
                this._ToasterEl.appendTo('.myOwnUI_Toaster_Panel.mOUITP_right');
            }
            else if(position==="bottom-right"){
                this._ToasterEl.prependTo('.myOwnUI_Toaster_Panel.mOUITP_bottom_right');
            }
            else if(position==="bottom"){
                this._ToasterEl.prependTo('.myOwnUI_Toaster_Panel.mOUITP_bottom');
            }
            else if(position==="bottom-left"){
                this._ToasterEl.prependTo('.myOwnUI_Toaster_Panel.mOUITP_bottom_left');
            }
            else if(position==="left"){
                this._ToasterEl.appendTo('.myOwnUI_Toaster_Panel.mOUITP_left');
            }
            else if(position==="top-left"){
                this._ToasterEl.appendTo('.myOwnUI_Toaster_Panel.mOUITP_top_left');
            }
            else if(position==="top"){
                this._ToasterEl.appendTo('.myOwnUI_Toaster_Panel.mOUITP_top');
            }
            let that2=this;
            this._ToasterEl.mouseenter(function() {
                if(that2.options.hoverOnTimeFreeze){
                    that2.freezeTimer=true;
                }
            }).mouseleave(function() {
                if(that2.options.hoverOnTimeFreeze){
                    that2.freezeTimer=false;
                }
            });

            this._ToasterEl.click(function() {
                if(that2.options.clickOnClose){
                    that2.close();
                }
            });

            //  precalculation

            this.pbWidth=this._ToasterEl.width();
            this.timerPreserve=this.options.presenceTimer/1000;

            this.pbPerSec=this.pbWidth/this.timerPreserve;

            this.framePerSec=30;
            this.timeInMS=1000;
            this.framePerMS=this.timeInMS/this.framePerSec;


            this.pbWidthRequiredToFPS=this.pbPerSec/this.framePerMS;

            this.pbWidthInPercentageToFPS=((this.pbWidthRequiredToFPS*100)/this.pbWidth);
            this.anim_fps = 30;
            this.anim_now=undefined;
            this.anim_then=undefined;
            this.anim_interval = 1000/this.anim_fps;
            this.anim_delta=undefined;
            this.initWidth=0;

            this.startListener();
        },
        startListener:function (){
            let that=this;
            if(this.options.trigger==='manual'){

            }
            else{
                window.setTimeout(function(){
                    if(that.options.animateWhenHideAs==='fade'){
                        that._ToasterEl.fadeIn(function (){
                            if(that.options.autoClose){
                                that.animRun=true;
                                that.applyAnimation();
                            }
                        });
                    }
                    else if(that.options.animateWhenHideAs==='hide'){
                        that._ToasterEl.show(function(){
                            if(that.options.autoClose){
                                that.animRun=true;
                                that.applyAnimation();
                            }
                        });
                    }
                    else{
                        that._ToasterEl.show(function (){
                            if(that.options.autoClose){
                                that.animRun=true;
                                that.applyAnimation();
                            }
                        });
                    }
                },this.options.beforeWaitTimer);
            }
        },
        applyAnimation:function (now){
            let that=this;
            if (!this.anim_then) { this.anim_then = now; }
            if(this.animRun){
                requestAnimationFrame(this.applyAnimation.bind(this));
            }
            else{
                return;
            }

            this.anim_delta = now - this.anim_then;
            if (this.anim_delta > this.anim_interval) {
                this.anim_then = now - (this.anim_delta % this.anim_interval);
                if(!this.freezeTimer){
                    if(this.initWidth<100){
                        this.initWidth+=this.pbWidthInPercentageToFPS;
                        this._ToasterEl.find(".myOUIT_timerSec").css({
                            "width":this.initWidth+"%"
                        });
                    }
                    else{
                        this.animRun=false;
                        this.close();
                    }
                }
            }
        },
        show:function (){
            if(this._ToasterEl){
                let that=this;
                window.setTimeout(function(){
                    if(that.options.animateWhenHideAs==='fade'){
                        that._ToasterEl.fadeIn(function (){
                            if(that.options.autoClose){
                                that.animRun=true;
                                that.applyAnimation();
                            }
                        });
                    }
                    else if(that.options.animateWhenHideAs==='hide'){
                        that._ToasterEl.show(function(){
                            if(that.options.autoClose){
                                that.animRun=true;
                                that.applyAnimation();
                            }
                        });
                    }
                    else{
                        that._ToasterEl.show(function (){
                            if(that.options.autoClose){
                                that.animRun=true;
                                that.applyAnimation();
                            }
                        });
                    }
                },this.options.beforeWaitTimer);
            }
        },
        close:function(){
            let that=this;
            this.forceClose();
        },
        forceClose:function(){
            let that=this;
            that.animRun=false;
            that.initWidth=0;
            that._ToasterEl.find(".myOUIT_timerSec").css({
                "width":0
            });

            if(that.options.animateWhenHideAs==='fade'){
                that._ToasterEl.fadeOut();
            }
            else if(that.options.animateWhenHideAs==='hide'){
                that._ToasterEl.hide();
            }
            else{
                that._ToasterEl.hide();
            }
        }
    };

    $.myOwnUIToaster=function(options){
        let myOwnUIToaster = Object.initObj(myOwnUIToasterObj);
        myOwnUIToaster.init(options, this);
        return {
            show: function () {
                myOwnUIToaster.show();
            },
            close: function( ) {
                myOwnUIToaster.forceClose();
            }
        }
    };

    $.myOwnUIToaster.options={
        toasterId:'',
        type:'info',  // info, success, failure, warning, unknown
        header:'Header',
        body:'Please add some text to show here',
        animateWhenShowAs:'fade',  // fade, hide
        animateWhenHideAs:'fade',  // fade, hide
        trigger:'manual',
        hoverOnTimeFreeze:true,
        beforeWaitTimer:100,
        presenceTimer:5000, // in seconds
        position:'top', // top,  top-right, right, bottom-right, bottom, left-bottom, left, left-top, center
        autoClose:true,
        clickOnClose:false
    };
})( jQuery, window, document );