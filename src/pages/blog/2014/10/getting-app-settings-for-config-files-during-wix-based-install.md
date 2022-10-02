---
id: 275
title: 'Getting app settings for config files during WiX-based install'
pubDate: '2014-10-08T20:43:38+01:00'
author: 'Steve Fenton'
layout: post
guid: 'https://www.stevefenton.co.uk/?p=275'
permalink: /2014/10/getting-app-settings-for-config-files-during-wix-based-install/
interface_sidebarlayout:
    - default
categories:
    - Automation
tags:
    - wix
---

WiX is great – but sometimes complex. Most of the complexity comes from needed to adjust things in many places to make a single thing work. For that reason, I feel the need to document the many steps required to do the following:

- Declare a property in the installer
- Allow the user to enter a value in the installer UI
- Place that value in the app.config or web.config file

Here are all the pieces.

Assumption: you have already created your own custom UI (probably by copying one of the WiX standard ones and editing it). If you have done this, you’ll find you already have a load of localized string available, but you will likely want to add more as described later in this article).

Here is my entire Custom\_Install.wxs file, just for reference…

```
<pre class="prettyprint lang-xml">
<?xml version="1.0" encoding="UTF-8"?>
<!--
Dialog sequence:
- WelcomeDlg
- LicenseAgreementDlg
- SettingsDlg
- VerifyReadyDlg
-->
<Wix xmlns="http://schemas.microsoft.com/wix/2006/wi">
  <Fragment>
   
    <WixVariable Id="WixUIBannerBmp" Value="UI\banner.jpg" />
    <WixVariable Id="WixUIDialogBmp" Value="UI\dialog.jpg" />
    <WixVariable Id="WixUILicenseRtf" Value="UI\License.rtf" />
   
    <UI Id="Custom_Install">
      <TextStyle Id="WixUI_Font_Normal" FaceName="Tahoma" Size="8" />
      <TextStyle Id="WixUI_Font_Bigger" FaceName="Tahoma" Size="12" />
      <TextStyle Id="WixUI_Font_Title" FaceName="Tahoma" Size="9" Bold="yes" />
      <Property Id="DefaultUIFont" Value="WixUI_Font_Normal" />
      <Property Id="WixUI_Mode" Value="Mondo" />
      <DialogRef Id="ErrorDlg" />
      <DialogRef Id="FatalError" />
      <DialogRef Id="FilesInUse" />
      <DialogRef Id="MsiRMFilesInUse" />
      <DialogRef Id="PrepareDlg" />
      <DialogRef Id="ProgressDlg" />
      <DialogRef Id="ResumeDlg" />
      <DialogRef Id="UserExit" />
      <Publish Dialog="ExitDialog" Control="Finish" Event="EndDialog" Value="Return" Order="999">1</Publish>
      <Publish Dialog="WelcomeDlg" Control="Next" Event="NewDialog" Value="LicenseAgreementDlg"></Publish>
      <Publish Dialog="LicenseAgreementDlg" Control="Back" Event="NewDialog" Value="WelcomeDlg">1</Publish>
      <Publish Dialog="LicenseAgreementDlg" Control="Next" Event="NewDialog" Value="SettingsDlg" Order="2">LicenseAccepted = "1"</Publish>
      <Publish Dialog="SettingsDlg" Control="Back" Event="NewDialog" Value="LicenseAgreementDlg"></Publish>
      <Publish Dialog="SettingsDlg" Control="Next" Event="NewDialog" Value="VerifyReadyDlg"></Publish>
      <Publish Dialog="VerifyReadyDlg" Control="Back" Event="NewDialog" Value="SettingsDlg" Order="1"></Publish>
    </UI>
    <UIRef Id="WixUI_Common" />
  </Fragment>
</Wix>
```

**app.config**

Or indeed web.config… you need to add your app setting just like normal. No tokens are needed for this method, so you can leave your default values in. The default values will be replaced when the installer runs.

```
<pre class="prettyprint lang-xml">
<appSettings>
    <add key="TcpPort" value="25" />
</appSettings>
```

**MyProduct.wxs**

I’m using the WiX util library, so you need to add the XML namespace to your documents (shown as “xmlns:util” below…):

```
<pre class="prettyprint lang-xml"><Wix
    xmlns="http://schemas.microsoft.com/wix/2006/wi"
    xmlns:util="http://schemas.microsoft.com/wix/UtilExtension">
```

In the product element… add a property element. The Id must be all UPPERCASE – this is secret code for “this property is public”.

```
<pre class="prettyprint lang-xml">
<Property Id="TCPPORT" Value="25"/>
```

In your component element… use the XmlFIle element from the util library to take the property and jam it into the app.config (works for web.config too). Special note – the XPath really does need to be escaped as shown because WiX uses \[ and \] to delimit property tokens, so you need to:

- Replace \[ with \[\\\[\]
- Replace \] with \[\\\]\]

```
<pre class="prettyprint lang-xml">
<util:XmlFile
    Id="UpdateTcpPort"
    Action="setValue"
    File="[INSTALLFOLDER]MyCompany.MyProduct.MyComponent.exe.config"
    SelectionLanguage="XPath"
    Permanent="yes"
    ElementPath="/configuration/appSettings/add[\[]@key='TcpPort'[\] ]/@value"
    Value="[TCPPORT]" />
```

**SettingsDlg.wxs**

In your UI dialog (in a separate file named “SettingsDlg.wxs” in my case) … you need to add a label and an edit box to allow the user to input the data as part of the installation process. The Property attribute links the edit box to the property set up above. The Text property takes the current value of the Property and shows it, so the user can choose to leave your default value if they wish (thus making your installer 1,000 times more user friendly).

```
<pre class="prettyprint lang-xml">
<!-- TCP Port -->
<Control
    Id="TcpPortLabel" Text="!(loc.SettingsDlg_TcpPortLabel)" Type="Text"
    X="10" Y="13" Height="18" Width="110" />
<Control
    Id="SettingTcpPort" Property="TCPPORT" Text="[TCPPORT]" Type="Edit"
    X="130" Y="10" Height="18" Width="80" />
```

Here is the entire SettingsDlg.wxs file for reference:

```
<pre class="prettyprint lang-xml"><?xml version="1.0" encoding="UTF-8"?>
<Wix xmlns="http://schemas.microsoft.com/wix/2006/wi">
  <Fragment>
    <UI>
      <Dialog Id="SettingsDlg" Width="370" Height="270" Title="!(loc.SettingsDlg_Title)" KeepModeless="yes">
        <!-- Tcp Port -->
                <Control
                        Id="TcpPortLabel" Text="!(loc.SettingsDlg_TcpPortLabel)" Type="Text"
                        X="10" Y="13" Height="18" Width="110" />
                <Control
                        Id="SettingTcpPort" Property="TCPPORT" Text="[TCPPORT]" Type="Edit"
                        X="130" Y="10" Height="18" Width="80" />
          <!-- Back / Forward / Cancel -->
          <Control Id="Back" Type="PushButton" X="180" Y="243" Width="56" Height="17" Text="!(loc.WixUIBack)" />
          <Control Id="Next" Type="PushButton" X="236" Y="243" Width="56" Height="17" Default="yes" Text="!(loc.WixUINext)" />
          <Control Id="Cancel" Type="PushButton" X="304" Y="243" Width="56" Height="17" Cancel="yes" Text="!(loc.WixUICancel)">
          <Publish Event="SpawnDialog" Value="CancelDlg">1</Publish>
        </Control>
      </Dialog>
    </UI>
  </Fragment>
</Wix>
```

**UILoc\_en-us.wxl**

You’ll notice that the label’s Text attribute has the value “!(loc.SettingsDlg\_TcpPortLabel)”. You could just put your text in there, for example “TCP Port”, but I am localizing the installer. If you are localizing the installer too, you’ll need to add the following entry in each language file (UILoc\_en-us.wxl, UILoc\_fr-fr.wxl and so on):

```
<pre class="prettyprint lang-xml">
<String Id="SettingsDlg_TcpPortLabel">TCP Port</String>
```

And here is the whole UILoc\_en-us.wxl file for reference:

```
<pre class="prettyprint lang-xml">
<?xml version="1.0" encoding="utf-8"?>
<WixLocalization Culture="en-us" Codepage="1252" xmlns="http://schemas.microsoft.com/wix/2006/localization">
        <String Id="SettingsDlg_Title">Application Settings</String>
        <String Id="SettingsDlg_TcpPortLabel">TCP Port</String>
</WixLocalization>
```