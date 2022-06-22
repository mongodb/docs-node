.. tabs::

   .. tab:: Windows
      :tabid: windows

      In PowerShell, run the following:

      .. code-block:: sh

         powershell -command "$r=[byte[]]::new(64);$g=[System.Security.Cryptography.RandomNumberGenerator]::Create();$g.GetBytes($r);[Convert]::ToBase64String($r)"

   .. tab:: Linux and Mac
      :tabid: nix

      In your terminal, run the following:

      .. code-block:: sh

         echo $(head -c 96 /dev/urandom | base64 | tr -d '\n')

Copy the output from the above command and paste it into a file called
``local-key.txt``.




