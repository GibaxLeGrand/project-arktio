<script>
    import {Canvas, Layer} from "svelte-canvas";

    $: bg = ({context, width, height}) => {
        context.fillStyle = rgb(0, 161, 154);
        context.fillRect(0, 0, width, height);
        context.fill();
    }
</script>

<Canvas>
    <Layer/>
</Canvas>

<style lang="scss">
  $turquoise: #00a19a;
  $blanc: #ffffff;
  $framboise: #ba105a;
  $caramel: #ffd49a;
  $turquoise_clair: #98d1cd;
  $gris: #90908f;
  $gris_fonce: #2c2c2c;
  $font_arktio: Raleway;
</style>