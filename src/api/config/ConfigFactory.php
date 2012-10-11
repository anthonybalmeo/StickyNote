<?php

require_once (dirname(dirname(__FILE__))."/lib/fb/facebook.php");

define("PATH_TO_CONFIG_LOADERS", "http://rocking-apps.com/sticky/api/config/loaders/");
define("DEFAULT_CONFIG_LOADER", "sticky.xml");

ConfigFactory::loadXML(DEFAULT_CONFIG_LOADER);

class ConfigFactory
{
	
    public static function getFacebook()
    {
        
        if(!ConfigFactory::isConfigSet("facebook"))
        {
            //Create an application instance.
            $facebook = new Facebook(array(
              'appId'  => ConfigFactory::get('app_id'),
              'secret' => ConfigFactory::get('app_secret'),
            ));

            return ConfigFactory::set("facebook", $facebook);
        }
        else
        {
            return ConfigFactory::get("facebook");
        }

    }

    /**
     * Stores static configuration variables.
     */
    private static $_vars = array();

    public static function loadXML($xmlFile)
    {
        $xml = simplexml_load_file(PATH_TO_CONFIG_LOADERS.$xmlFile);

        self::$_vars = array();

        foreach($xml as $config_key => $config_value)
        {   
            //This is a bad runaround - basically if there is an array,
            //we leave it as an XML object, and if it's not an array we
            //convert it to a string - otherwise very funny things happen - like
            //trying to pass objects as part of URLs.
            //ToDo: Come up with a better sollution.
            if(count($config_value) == 0)
                self::$_vars[$config_key] = $config_value."";
            else
                self::$_vars[$config_key] = $config_value;
        }

    }

    /**
     * Gets configuration variables. If the configuration variable is not set,
     * return false. 
     * 
     * @param string $var_name The configuration variable to retrieve.
     */
    public static function get($var_name)
    {
        if(isset(self::$_vars[$var_name]))
        {
            return self::$_vars[$var_name];
        }

        return false;
    }
        
	
    /**
     * Sets a configuration variables.
     * 
     * @param string $var_name The key/name of the configuration variable.
     * @param mixed $var_value The actual variable value.
     */
    public static function set($var_name, $var_value)
    {
        return self::$_vars[$var_name] = $var_value;

    }
    
    /**
     * Checks to see if the specified variable name is defined in the current
     * configuration factory.
     * 
     * @param string $var_name The key/name of the configuration variable.
     * @return boolean True if the variable is set, false otherwise.
     */
    public static function isConfigSet($var_name)
    {
        return (isset(self::$_vars[$var_name]));
    }
	  
	  
}

?>