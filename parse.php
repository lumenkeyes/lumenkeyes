<!DOCTYPE html>
<head>
	<title>Blog</title>
	<style>
		* {
			box-sizing: border-box;
		}
		body, html {
			display: inline-block;
			margin: 0;
			padding: 0;
		}
		body {
			height: 100vh;
			width: 100vw;
		}
		main {
			text-align: center;
		}
		h1 {
			text-align: center;
		}
		footer {
			width: 100vw;
			text-align: center;
			position: absolute;
			bottom: 0;
		}
	</style>
</head>
<body>
	<main>
	<?php

		$uri = $_SERVER['REQUEST_URI'];

		$docRoot = $_SERVER['DOCUMENT_ROOT'];
		if(substr($uri, -4) == "blog") $uri = "/index.md";
		if(substr($uri, -3) != ".md") $uri = "{$uri}.md";
		$file = file_get_contents($docRoot.$uri);
		if($file === false) {
			header("HTTP/1.0 404 Not Found");
			exit();
		}
		require "Parsedown.php";
		
		$Parsedown = new Parsedown();
		echo $Parsedown->text($file);
		if($uri == "/index.md") {
			echo "<h2>Public Files</h2>\n
			<ul>";
			foreach(glob("/etc/nginx/html/lumenkeyes/blog/public/*.*") as $filename) {
				$filename = substr($filename, 39);
				if($filename != "index.md") echo "<li><a href='blog/public/$filename'>$filename</a></li>\n";
			}
			echo "</ul>";
		}
		?>
	</main>
<footer>
	<?php
	
		echo "This file last modified ".date ("F d Y H:i:s.", filemtime($docRoot.$uri));

	?>
</body>
