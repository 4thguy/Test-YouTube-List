$(function() {
    var response = "";
    var form_data = {};
    $.ajax({
        type: "GET",
        url: "api.php",
        data: form_data,
        success: function(response) {
            console.log(response);

            var template = $('.box.template').removeClass('template');

            response.forEach(function(entry) {
                var newBox = $(template).clone().removeClass('template');

                $(newBox)
                    .find('.url')
                    .attr('href', 'https://www.youtube.com/watch?v=' + entry.id.videoId);

                for (var key in entry.snippet.thumbnails) {
                    $(newBox).find('.' + key)
                        .attr('src', entry.snippet.thumbnails[key].url)
                        .attr('width', entry.snippet.thumbnails[key].width)
                        .attr('height', entry.snippet.thumbnails[key].height);
                }

                var text = $(newBox).html();
                for (var key in entry.snippet) {
                    text = text.replace('{{ ' + key + ' }}', entry.snippet[key]);
                }
                $(newBox).html(text);

                $(newBox).insertBefore(template);
            });

            template.addClass('template');
        },
        error: function(response) {
            console.log(response);
        },
        dataType: "json" //set to JSON    
    });
});