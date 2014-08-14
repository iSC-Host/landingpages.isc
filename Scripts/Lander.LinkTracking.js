$(function () {
    var str = document.location.href,
        suffix = "/confirmation";
    if (str.indexOf(suffix, str.length - suffix.length) == -1) {
        $('a.conversion_goal, div.conversion_goal').bind('mousedown', function (e) {
            if (e.button == 0 || e.button == 1) {
                //if the user clicks with the middle button and it's a link, or press the ctrl key, or opens the link in a new tab
                //then we post the event.
                if (this.tagName != 'DIV' && (e.button == 1 || e.ctrlKey || $(this).attr('target') == '_blank')) {
                    $.post('/Lander/Home/LinkClicked?' + this.id);
                }
                //if opens the link in the same window we redirect after we have the ack from the server.
                else if ((e.button != 1 && this.tagName == 'DIV') || (this.tagName != 'DIV')) {
                    $(this).click(function (clickEvent) { clickEvent.preventDefault() })
                    var url = $(this).attr('href'),
                        tagName = this.tagName,
                        formParent = $(this).parent().parent();
                    $.post('/Lander/Home/LinkClicked?' + this.id).complete(function () {
                        if (tagName != 'DIV')
                            document.location = url;
                        else
                            formParent.submit();
                    });
                }
            }
        });
    }
    else {
        $('div.conversion_goal').bind('mousedown', function (e) {
            if (e.button == 0)
                $(this).parent().parent().submit();
        });
    }
    //we remove the event from the form's button.
    $('form div a').unbind('mousedown');
});
