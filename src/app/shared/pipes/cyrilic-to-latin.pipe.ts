import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cyrilicToLatin',
})
export class CyrillicToLatinPipe implements PipeTransform {
  transform(originalString: string): string {
    const cyrillic: string[] =
      'А_Б_В_Г_Д_Е_Ё_Ж_З_И_Й_К_Л_М_Н_О_П_Р_С_Т_У_Ф_Х_Ц_Ч_Ш_Щ_Ъ_Ы_Ь_Э_Ю_Я_а_б_в_г_д_е_ё_ж_з_и_й_к_л_м_н_о_п_р_с_т_у_ф_х_ц_ч_ш_щ_ъ_ы_ь_э_ю_я'.split(
        '_'
      );
    const latin: string[] =
      'A_B_V_G_D_E_E_ZH_Z_I_J_K_L_M_N_O_P_R_S_T_U_F_H_C_CH_SH_SH_ʺ_Y_ʹ_E_YU_YA_a_b_v_g_d_e_e_zh_z_i_j_k_l_m_n_o_p_r_s_t_u_f_h_c_ch_sh_sh_ʺ_y_ʹ_e_yu_ya'.split(
        '_'
      );

    if (!originalString) {
      return '';
    }

    return originalString
      .split('')
      .map(function (char) {
        let index = cyrillic.indexOf(char);
        if (!~index) return char;
        return latin[index];
      })
      .join('');
  }
}
