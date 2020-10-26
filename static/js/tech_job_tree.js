      google.charts.load('current', {'packages':['treemap']});
      google.charts.setOnLoadCallback(drawChart);
      function drawChart() {
        var data = google.visualization.arrayToDataTable([
          ['Location', 'Parent', 'Total Tech Employment'],
          ['Tech Hub Cities',    null,                 0],
          ['Atlanta',   'Tech Hub Cities',             0],
          ['Austin',    'Tech Hub Cities',             0],
          ['New York City',      'Tech Hub Cities',             0],
          ['San Francisco', 'Tech Hub Cities',             0],
          ['Chicago', 'Tech Hub Cities',             0],
          
          // ATLANTA
          ['Computer Systems Analysts',    'Atlanta',            16280],
          ['Information Security Analysts',       'Atlanta',            3540],
          ['Computer and Information Research Scientists',    'Atlanta',            380],
          ['Computer Network Support Specialists',    'Atlanta',            5450],
          ['Computer User Support Specialists',    'Atlanta',            17150],
          ['Computer Network Architects',    'Atlanta',            4960],
          ['Network and Computer Systems Administrators',    'Atlanta',            7340],
          ['Database Administrators and Architects',    'Atlanta',            4160],
          ['Computer Programmers',    'Atlanta',            3600],
          ['Software Developers and Software Quality Assurance Analysts and Testers',    'Atlanta',            40400],
          ['Web Developers and Digital Interface Designers',    'Atlanta',            2720],
          ['Computer Occupations, All Other',    'Atlanta',            17180],
          ['Actuaries',    'Atlanta',            230],
          ['Operations Research Analysts',    'Atlanta',            3180],
          ['Statisticians',    'Atlanta',            550],
          ['Data Scientists and Mathematical Science Occupations, All Other',    'Atlanta',            920],
          
          // AUSTIN
          ['Computer Systems Analysts.',    'Austin',            9040],
          ['Information Security Analysts.',       'Austin',            1550],
          ['Computer and Information Research Scientists.',    'Austin',            290],
          ['Computer Network Support Specialists.',    'Austin',            2750],
          ['Computer User Support Specialists.',    'Austin',            8270],
          ['Computer Network Architects.',    'Austin',            2160],
          ['Network and Computer Systems Administrators.',    'Austin',            5580],
          ['Database Administrators and Architects.',    'Austin',            2060],
          ['Computer Programmers.',    'Austin',            3290],
          ['Software Developers and Software Quality Assurance Analysts and Testers.',    'Austin',            23410],
          ['Web Developers and Digital Interface Designers.',    'Austin',            2160],
          ['Computer Occupations, All Other.',    'Austin',            3950],
          ['Actuaries.',    'Austin',            340],
          ['Operations Research Analysts.',    'Austin',            1190],
          ['Statisticians.',    'Austin',            280],
          ['Data Scientists and Mathematical Science Occupations, All Other.',    'Austin',            370],
          
          // CHICAGO
          ['Computer Systems Analysts..',    'Chicago',            22410],
          ['Information Security Analysts..',       'Chicago',            3030],
          ['Computer and Information Research Scientists..',    'Chicago',            380],
          ['Computer Network Support Specialists..',    'Chicago',            9120],
          ['Computer User Support Specialists..',    'Chicago',            19250],
          ['Computer Network Architects..',    'Chicago',            4250],
          ['Network and Computer Systems Administrators..',    'Chicago',            9460],
          ['Database Administrators and Architects..',    'Chicago',            3780],
          ['Computer Programmers..',    'Chicago',            7720],
          ['Software Developers and Software Quality Assurance Analysts and Testers..',    'Chicago',            46970],
          ['Web Developers and Digital Interface Designers..',    'Chicago',            4830],
          ['Computer Occupations, All Other..',    'Chicago',            11040],
          ['Actuaries..',    'Chicago',            1740],
          ['Mathematicians',    'Chicago',            60],
          ['Operations Research Analysts..',    'Chicago',            3370],
          ['Statisticians..',    'Austin',            1550],
          ['Data Scientists and Mathematical Science Occupations, All Other..',    'Chicago',            1570],
          
          
          // New York
          ['Computer Systems Analysts...',    'New York City',            44210],
          ['Information Security Analysts...',       'New York City',            8850],
          ['Computer and Information Research Scientists...',    'New York City',            1800],
          ['Computer Network Support Specialists...',    'New York City',            13450],
          ['Computer User Support Specialists...',    'New York City',            42840],
          ['Computer Network Architects...',    'New York City',            10120],
          ['Network and Computer Systems Administrators...',    'New York City',            27140],
          ['Database Administrators and Architects...',    'New York City',            8890],
          ['Computer Programmers...',    'New York City',            15070],
          ['Software Developers and Software Quality Assurance Analysts and Testers...',    'New York City',            100470],
          ['Web Developers and Digital Interface Designers...',    'New York City',            13460],
          ['Computer Occupations, All Other...',    'New York City',            12150],
          ['Actuaries...',    'New York City',            2350],
          ['Mathematicians.',    'New York City',            230],
          ['Operations Research Analysts...',    'New York City',            7370],
          ['Statisticians...',    'New York City',            1700],
          ['Data Scientists and Mathematical Science Occupations, All Other...',    'New York City',            2690],
          
          // SF
          ['Computer Systems Analysts .',    'San Francisco',            16980],
          ['Information Security Analysts .',       'San Francisco',            2260],
          ['Computer and Information Research Scientists .',    'San Francisco',            2580],
          ['Computer Network Support Specialists .',    'San Francisco',            3320],
          ['Computer User Support Specialists .',    'San Francisco',            16980],
          ['Computer Network Architects .',    'San Francisco',            4250],
          ['Network and Computer Systems Administrators .',    'San Francisco',            7070],
          ['Database Administrators and Architects .',    'San Francisco',            3660],
			  
          ['Computer Programmers .',    'San Francisco',            6120],
          ['Software Developers and Software Quality Assurance Analysts and Testers .',    'San Francisco',            65790],
          ['Web Developers and Digital Interface Designers .',    'San Francisco',            6160],
          ['Computer Occupations, All Other .',    'San Francisco',            22250],
          ['Actuaries .',    'San Francisco',            440],
          ['Operations Research Analysts .',    'San Francisco',            2460],
          ['Statisticians .',    'San Francisco',            1770],
          ['Data Scientists and Mathematical Science Occupations, All Other .',    'San Francisco',            1410],
       
          
 
        ]);

        tree = new google.visualization.TreeMap(document.getElementById('chart_div'));

        var options = {
          minColor: '#076794',
          midColor: '#ddd',
          maxColor: '#e8fbfe',
          headerHeight: 15,
          fontColor: 'black',
          fontFamily:"Arial",
          fontSize: 15,
          showScale: true,
          generateTooltip: showFullTooltip
        };
					
        tree.draw(data, options);
        
        function showFullTooltip(row, size, value) {
          return '<div style="background:#e6f3f6; padding:13px; border-style:none">' +
                 '<span style="font-family:"Arial";"><b>' + data.getValue(row, 0) +
                 '</b></span><br>' + '<span style="font-family:"Arial";">' + data.getColumnLabel(2) + " : "  + size + '<br>' + ' </div>';
        }
     };

