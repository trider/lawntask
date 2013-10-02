$(document).ready(function ()
{

    var tasks = Lawnchair({ adaptor: 'dom', table: 'tasks', record: 'task' }, function ()
    {
        console.log('Task storage open');
    });


    $("#tsks").sortable();
    addTasks(tasks);
    populateFltr(tasks);
    var i = countTasks(tasks);

    $("#add").click(function ()
    {
        i++;
        addTask(tasks, i);
    });

    $("#delete").click(function ()
    {
        removeTask(tasks);
        addTasks(tasks);
        i = countTasks(tasks);

    });


    $("#start").click(function ()
    {
        location.reload();
    });

    $("#stop").click(function ()
    {
        removeTasks(tasks);
        location.reload();
    });

    $("#filter").click(function ()
    {
        filterTasks(tasks);
    });

    $("input:checkbox").on('click', function ()
    {

        $(this).parent().css({'text-decoration':'none'}); 
                
        if($(this).is('input:checked'))
        {
           
           $(this).parent().css({'text-decoration':'line-through'});      
        }
                 
    });

});

//var countChecked = function ()
//{
//    if($('input:checked').is(':checked'))
//    {
//        $("input:checked").parent().css({'text-decoration':'line-through'});    
//    }
//    else
//    {
//         $("input").parent().css({'text-decoration':'none'});  
//    }
//    
//};
//countChecked();


function populateFltr(tasks)
{
    
    $('#filterlst').html('');
    
    var prev;
    tasks.each(function (task, index)
    {
        if(prev != task.set)
        {
            $('#filterlst').append('<option>' + task.set + '</option>');
            prev = task.set;   
        }
    });
}


function addTask(tasks, i)
{
    var task = $('#inputTask').val();
    var descrip = $('#inputDescription').val();
    var col = $('#inputCollection').val();

    tasks.save({ set: col, title: task, description: descrip, key: i }, function (task)
    {
        var txt = task.title + ': ' + task.description + ' (' + task.set + ',' + task.key + ')';
        $('#tsks').append('<li><label class="checkbox"><input type="checkbox"  + value="' +
            task.key + '">' + txt + '</label></li>');    
    });
    
    populateFltr(tasks);
}


function addTasks(tasks)
{
    displayList(tasks);    
}

function filterTasks(tasks)
{
   $('#tsks').html('');
   var fltr = 'task.set ==="' + $('#filterlst').val() +'"';
   tasks.where(fltr).asc('active', function ()
   {
      displayList(tasks);
   });
}

function countTasks(tasks)
{

    var i = 0;
    tasks.each(function (task, index)
    {
        i++;
    });

    console.log('Total tasks:'+ i);
    return i;

}


function displayList(tasks)
{

    tasks.each(function (task, index)
    {
        var txt = task.title + ': ' + task.description + ' (' + task.set + ',' + task.key + ')';
        $('#tsks').append('<li><label class="checkbox"><input type="checkbox"  + value="' +
            task.key + '">' + txt + '</label></li>');    
    });


    //$("#tsks").sortable("serialize").each(function (index)
    //{
    //    console.log('item (' + index + ')');
    //    //console.log($('li').get(index));
    //});
    
    

}

function removeTask(tasks)
{
    $("input[type='checkbox']:checked").each(function (index)
    {
        //console.log($('input:checked').val() + ':' + $('input:checked').is(':checked'));
        tasks.each(function (record, index)
        {
            if(record.key==$('input:checked').val())
            {
                console.log('Task ' + index + ' removed');
                tasks.remove(index);
            }
        });      
    });

}

function removeTasks(tasks)
{
    $('#content').html('');
    tasks.each(function (record, index)
    {
        console.log('Task ' + index + ' removed');
        tasks.remove(index);
    });

}

